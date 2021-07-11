import { Component, OnInit } from '@angular/core';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { FavoriteService } from '../favorite.service';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';
import { JunaAsemaService } from '../juna-asema.service';
import { SaaService } from '../saa.service';
import { environment } from 'src/environments/environment'; // Tuodaan enviromentista url osoitteet

import * as L from 'leaflet'; // Kartta jutut tuodaan
import { JunaService } from '../juna.service';

// Nämä tuodaan karttatietoja varten, kartta ikonit tallennettu assets-kansioon.
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;
// Tähän asti tuodaan karttatietoja varten

@Component({
  selector: 'app-etusivu',
  templateUrl: './etusivu.component.html',
  styleUrls: ['./etusivu.component.css'],
})
export class EtusivuComponent implements OnInit {
  aikataulu; // Rautatieaseman aikataulu html sivulle
  suosikit; // Suosikki tietojen haku
  username; // Käyttäjänimi
  saanyt; // Säätiedot etusivulle
  junaasema1; // Suosikki 1 juna-asema
  junaasema2; // Suosikki 2 juna-asema
  suosikkisaa1; // Suosikki 1 sääaseman säätiedot
  suosikkisaa2; // Suosikki 2 sääaseman säätiedot
  suosikkisaaasema1; // Suosikki 1 sääasema
  suosikkisaaasema2; // Suosikki 2 sääasema
  suosikkirautatie1; // Suosikki 1 rautatieasema aikataulu
  suosikkirautatie2; // Suosikki 2 rautatieasema aikataulu
  login: boolean; //tarkistetaan onko käyttäjä kirjautuneena sisään
  havaintoasemat: Array<HavaintoAsemat> = []; // Säähavaintoasemat
  time: string; // Aika
  timeEkanJunan: string;

  // Esitellään karttatiedot asemien tietoa varten
  private map: any;
  latlng: L.LatLng;
  lat: number;
  lon: number;

  // Tietoja html sivulta, että mitä haetaan
  private apiUrl = environment.ownUrlEnv + '/juna/aikataulu/'; // Pää url

  constructor(
    private favoriteService: FavoriteService,
    private SaaService: SaaService,
    private junaAsematService: JunaAsemaService,
    private havaintoAsemaService: HavaintoasemaService,
    private junatService: JunaService
  ) {
    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.username = currentUser && currentUser.username;

    /* varmistetaan että login -tila säilyy myös kun sivu päivitetään
       varmistus tehdään katsomalla onko token sessionstoragessa.
       Yllä oleva observablen tilaus silti tarvitaan, sillä sessionstoragen
       tarkistus vaatii aina reffauksen koska sitä ei voi kutsua asynkronisesti. */
    const atoken = sessionStorage.getItem('accesstoken');
    if (atoken) {
      this.login = true;
    } else {
      this.login = false;
    }

    // Jos login on true haetaan suosikki tiedot
    if (this.login === true) {
      this.haeSuosikit(this.username);
    }

    // Junien sijaintietoja varten
    this.lat = 0;
    this.lon = 0;
    this.latlng = new L.LatLng(this.lat, this.lon);
  }

  ngOnInit(): void {
    this.time = null;
  }

  // Jutut jotka tehdään sitten kun templaatti eli html-osa on latautunut muistiin
  ngAfterViewInit() {
    this.kaikkienJunienSijainnit();
  }

  // Hae suosikki sää- ja rautatieasemat
  haeSuosikit(username) {
    // Haetaan suosikit
    this.favoriteService.haeSuosikit(username).subscribe((data: any) => {
      // Suosikki 1 rautatieasema
      this.junaAsematService
        .haeAsemanAikataulu(data.favoritesJuna1, 0, 1, 0, 1)
        .subscribe((aikataulu) => (this.suosikkirautatie1 = aikataulu)),
        // Haetaan suosikki rautatieaseman lyhytkoodi
        this.junaAsematService
          .haeAsemaLyhytKoodi(data.favoritesJuna1)
          .subscribe((asema) => (this.junaasema1 = asema)),
        // Suosikki 2 rautatieasema
        this.junaAsematService
          .haeAsemanAikataulu(data.favoritesJuna2, 0, 1, 0, 1)
          .subscribe((aikataulu) => (this.suosikkirautatie2 = aikataulu)),
        // Haetaan suosikki rautatieaseman lyhytkoodi
        this.junaAsematService
          .haeAsemaLyhytKoodi(data.favoritesJuna2)
          .subscribe((asema) => (this.junaasema2 = asema));

      // Suosikki 1 sääasema
      this.SaaService.haeSaaNyt(data.favoritesSaa1).subscribe(
        (saanyt) => (this.suosikkisaa1 = saanyt)
      ),
        // Suosikki 2 sääasema
        this.SaaService.haeSaaNyt(data.favoritesSaa2).subscribe(
          (saanyt) => (this.suosikkisaa2 = saanyt)
        );
    });

    // Haetaan suosikki säähavaintoasemien fmisid numeroille havaintoaseman koko nimet
    this.favoriteService.haeSuosikit(username).subscribe((dataUser: any) => {
      // Haetaan säähavaintoasemat
      this.havaintoAsemaService
        .haeHavaintoAsemat()
        .subscribe((havaintoAsemat) => {
          for (let x = 0; x < havaintoAsemat.length; x++) {
            // Haetaan suosikki 1 säähavaintoaseman koko nimi
            if (havaintoAsemat[x].fmisid === dataUser.favoritesSaa1) {
              this.suosikkisaaasema1 = havaintoAsemat[x].name;
            }

            // Haetaan suosikki 2 säähavaintoaseman kokonimi
            if (havaintoAsemat[x].fmisid === dataUser.favoritesSaa2) {
              this.suosikkisaaasema2 = havaintoAsemat[x].name;
            }
          }
        });
    });
  }

  // Saadaan html sivulle tuulen nopeuden tekstit
  tuulenNopeus(tnopeusnro: number) {
    if (tnopeusnro < 1) {
      return 'tyyntä';
    } else if (tnopeusnro >= 1 && tnopeusnro < 4) {
      return 'heikkoa';
    } else if (tnopeusnro >= 4 && tnopeusnro < 8) {
      return 'kohtalaista';
    } else if (tnopeusnro >= 8 && tnopeusnro < 14) {
      return 'navakkaa';
    } else if (tnopeusnro >= 14 && tnopeusnro < 21) {
      return 'kovaa';
    } else if (tnopeusnro >= 21 && tnopeusnro <= 32) {
      return 'myrskyä';
    } else if (tnopeusnro > 32) {
      return 'hirmumyrsky';
    }
  }

  // Kaikkien junien sijaintitiedot
  kaikkienJunienSijainnit(): any {
    // Haetaan junien sijantitiedot
    this.junatService.haeKaikkienPaikkaTiedot().subscribe(
      (data) => {
        // Kartan paikka eka
        this.latlng = new L.LatLng(63.98, 25.759);

        // 'kartta' viittaus on html kohtaan <div id="kartta"></div>
        this.map = L.map('kartta').setView(this.latlng, 6);

        // add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          maxZoom: 18,
          minZoom: 3,
        }).addTo(this.map);

        // show the scale bar on the lower left corner
        L.control.scale().addTo(this.map);

        // Ensimmäisen sijaintilistassa olevan junan aikataulu tieto html-sivulle
        this.timeEkanJunan = data[0]['timestamp'];

        // Käydään jokaisen junan sijaintitieto läpi
        for (let x = 0; data.length; x++) {
          // Haetaan koordinaatit muuttujiin
          this.lon = data[x]['location']['coordinates'][0]; // Longitude sijainti
          this.lat = data[x]['location']['coordinates'][1]; // Latitude sijainti
          let aika = data[x]['departureDate']; // Aikataulu
          let junannumero = data[x]['trainNumber']; // Junan numero
          let nopeus = data[x]['speed']; // Junan nopeus

          // Laitetaan merkki kartalle ja otetaan muuttujaan tieto
          let linkki = new L.marker(new L.LatLng(this.lat, this.lon))
            .bindPopup('Juna: ' + junannumero + ', nopeus: ' + nopeus + ' km/h')
            .addTo(this.map);

          // Junan aikataulu linkki
          let urllinkki = this.apiUrl + aika + '/' + junannumero;

          // Kun hiiri viedään sinisen merkin päälle avautuu popuppi joka on määritelty bindPopup kohdassa
          linkki.on('mouseover', function () {
            this.openPopup();
          });

          // Kun hiiri viedään pois sinisen merkin päältä popuppi sulkeutuu
          linkki.on('mouseout', function () {
            this.closePopup();
          });

          // Kun sinistä merkkiä klikkaa aukeaa junan aikataulu tiedot
          linkki.on('click', function () {
            window.open(urllinkki, '_self');
          });
        }
      },

      // Jos tulee virheitä
      (err) => {
        console.log(err);
      }
    );
  }
}
