import { Component, OnInit } from '@angular/core';
import { JunaAsemaService } from '../juna-asema.service';
import { RautatieAsemat } from '../rautatieAsemat';
import { environment } from 'src/environments/environment'; // Tuodaan enviromentista url osoitteet

import * as L from 'leaflet'; // Kartta jutut tuodaan

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
  selector: 'app-junaasemat',
  templateUrl: './junaasemat.component.html',
  styleUrls: ['./junaasemat.component.css'],
})
export class JunaasematComponent implements OnInit {
  rautatieasemat: Array<RautatieAsemat> = []; // Rautatieasemien taulukko johon asemat haetaan käynnistyksessä
  stations: Array<RautatieAsemat> = []; // Tyhjä taulukko jota käytetään rautatieasemien hakuun
  time: string; // Aika

  // Esitellään karttatiedot asemien tietoa varten
  private map: any;
  latlng: L.LatLng;
  lat: number;
  lon: number;

  // Tietoja html sivulta, että mitä haetaan
  private apiUrl = environment.ownUrlEnv + '/rautatieasema/'; // Pää url

  constructor(private junaAsematService: JunaAsemaService) {
    // Haetaan rautatieasemat rautatieasemat taulukkoon
    this.junaAsematService
      .haeAsemat()
      .subscribe((data) => (this.rautatieasemat = data));

    // Rautatieasemien sijaintitietoja varten
    this.lat = 0;
    this.lon = 0;
    this.latlng = new L.LatLng(this.lat, this.lon);
  }

  ngOnInit(): void {}

  // Jutut jotka tehdään sitten kun templaatti eli html-osa on latautunut muistiin
  ngAfterViewInit() {
    this.kaikkienAsemenSijainnit();
  }

  // Kaikkien rautatieasemien sijainnit kartalla
  kaikkienAsemenSijainnit(): any {
    // Haetaan asemien sijantitiedot
    this.junaAsematService.haeAsemat().subscribe(
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

        // Käydään asemien sijainnit läpi ja lisätään ne kartalle
        for (let x = 0; x < data.length; x++) {
          // Näytetään käytössä olevat asemat ja seisakkeet
          if (
            (data[x]['passengerTraffic'] === true &&
              data[x]['type'] === 'STATION') ||
            data[x]['type'] === 'STOPPING_POINT'
          ) {
            // Haetaan koordinaatit muuttujiin
            this.lon = Number(data[x]['longitude']); // Longitude sijainti
            this.lat = Number(data[x]['latitude']); // Latitude sijainti

            // Laitetaan merkki kartalle ja otetaan tieto muuttujaan.
            let linkki = new L.marker(new L.LatLng(this.lat, this.lon))
              .bindPopup(data[x]['stationName'])
              .addTo(this.map);

            // Rautatieaseman linkki
            let urllinkki = this.apiUrl + data[x]['_id'];

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
        }
      },

      // Jos tulee virheitä
      (err) => {
        console.log(err);
      }
    );
  }

  // Rautatieaseman haku
  search(term: string): void {
    // Kun kirjaimia on syötetty 2 tai enemmän, näytetään maksimissaan 10 hakutulosta.
    if (term.length > 1) {
      this.stations = this.rautatieasemat
        .filter((str) => {
          return (
            str.stationName.toLocaleLowerCase().indexOf(term.toLowerCase()) >= 0
          );
        })
        .slice(0, 10);
    }

    // Kun kirjaimia on syötetty 0 niin ei näytetä yhtään hakutulosta listasta.
    if (term.length === 0) {
      this.stations = this.rautatieasemat
        .filter((str) => {
          return (
            str.stationName.toLocaleLowerCase().indexOf(term.toLowerCase()) >= 0
          );
        })
        .slice(0, 0);
    }
  }
}
