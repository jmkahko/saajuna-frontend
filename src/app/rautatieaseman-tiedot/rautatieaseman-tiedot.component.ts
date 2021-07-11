import { Component, OnInit } from '@angular/core';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';
import { JunaAsemaService } from '../juna-asema.service';
import { SaaService } from '../saa.service';

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
  selector: 'app-rautatieaseman-tiedot',
  templateUrl: './rautatieaseman-tiedot.component.html',
  styleUrls: ['./rautatieaseman-tiedot.component.css'],
})
export class RautatieasemanTiedotComponent implements OnInit {
  // Rautatieaseman tiedot tulevat heti alkuun
  station; // Rautatieaseman tiedot html sivulle
  aikataulu; // Rautatieaseman aikataulu html sivulle
  aika; // Aikatieto html sivustolle
  saaennuste; //Sääennuste html sivustolle

  // Karttaa varten muuttujien esittely
  private map: any;
  latlng: L.LatLng;
  lat: number;
  lon: number;
  name: string;
  asema;
  time: string;

  constructor(
    private route: ActivatedRoute,
    private junaAsematService: JunaAsemaService,
    private SaaService: SaaService
  ) {
    // Alustetaan koordinaatit nollatiedoilla
    this.lat = 0;
    this.lon = 0;
    this.latlng = new L.LatLng(this.lat, this.lon);
  }

  // Kun komponentti syntyy muistiin, rautatieaseman tiedot tulevat komponenttiin id:n perusteella
  ngOnInit(): void {
    this.haeAsema();
    this.haeAsemanAikataulu();
    this.haeSaaEnnuste();
  }

  // Jutut jotka tehdään sitten kun templaatti eli html-osa on latautunut muistiin
  ngAfterViewInit() {
    this.haeAsemanSijaintiKartalla();
  }

  // Haetaan rautatieaseman tiedot id:n perusteella
  haeAsema(): void {
    const id = this.route.snapshot.paramMap.get('id'); // id tieto on string, josta johtuen ei muuteta numeroksi
    this.junaAsematService
      .haeAsema(id)
      .subscribe((station) => (this.station = station));
  }

  // Haetaan aseman aikataulu
  haeAsemanAikataulu(): void {
    // Kiinteät muuttujat alkuun, kuinka monta junaa haetaan tietyissä tilanteissa
    const arrived_trains = 0;
    const arriving_trains = 5;
    const departed_trains = 0;
    const departing_trains = 5;

    // Haetaan halutun aseman lyhytkoodi
    const id = this.route.snapshot.paramMap.get('id'); // id tieto on string, josta johtuen ei muuteta numeroksi
    this.junaAsematService.haeAsema(id).subscribe((data: any) => {
      // Haetaan rautatieaseman aikataulu seuraavaksi
      this.junaAsematService
        .haeAsemanAikataulu(
          data.stationShortCode,
          arrived_trains,
          arriving_trains,
          departed_trains,
          departing_trains
        )
        .subscribe((aikataulu) => (this.aikataulu = aikataulu));
    });
  }

  // Haetaan rautatieaseman koordinaattien pohjalta sääennuste
  haeSaaEnnuste(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.junaAsematService.haeAsema(id).subscribe((data: any) => {
      this.SaaService.haeSaaEnnuste(
        data.latitude + ',' + data.longitude
      ).subscribe((saaennuste) => (this.saaennuste = saaennuste));
    });
  }

  // Näytetään tuulensuunta nimenä
  tuulenSuunta(tsuuntanro: number) {
    if (tsuuntanro >= 23 && tsuuntanro <= 68) {
      return 'koillistuulta';
    } else if (tsuuntanro >= 69 && tsuuntanro <= 112) {
      return 'itätuulta';
    } else if (tsuuntanro >= 113 && tsuuntanro <= 158) {
      return 'kaakkoistuulta';
    } else if (tsuuntanro >= 159 && tsuuntanro <= 202) {
      return 'etelätuulta';
    } else if (tsuuntanro >= 203 && tsuuntanro <= 248) {
      return 'lounaistuulta';
    } else if (tsuuntanro >= 249 && tsuuntanro <= 292) {
      return 'länsituulta';
    } else if (tsuuntanro >= 293 && tsuuntanro <= 337) {
      return 'luoteistuulta';
    } else if (tsuuntanro >= 338 && tsuuntanro <= 360) {
      return 'pohjoistuulta';
    } else if (tsuuntanro >= 0 && tsuuntanro <= 22) {
      return 'pohjoistuulta';
    }
  }

  // Näytetään tuulensuunnan kuva
  tuulenSuuntaKuva(tsuuntanro: number) {
    if (tsuuntanro >= 23 && tsuuntanro <= 68) {
      return 'north-west';
    } else if (tsuuntanro >= 69 && tsuuntanro <= 112) {
      return 'east';
    } else if (tsuuntanro >= 113 && tsuuntanro <= 158) {
      return 'south-east';
    } else if (tsuuntanro >= 159 && tsuuntanro <= 202) {
      return 'south';
    } else if (tsuuntanro >= 203 && tsuuntanro <= 248) {
      return 'south-west';
    } else if (tsuuntanro >= 249 && tsuuntanro <= 292) {
      return 'west';
    } else if (tsuuntanro >= 293 && tsuuntanro <= 337) {
      return 'north-west';
    } else if (tsuuntanro >= 338 && tsuuntanro <= 360) {
      return 'north';
    } else if (tsuuntanro >= 0 && tsuuntanro <= 22) {
      return 'north';
    }
  }

  // Näytetään tuulen nopeus tekstinä
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

  // Aseman sijainti kartalla
  haeAsemanSijaintiKartalla(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.junaAsematService.haeAsema(id).subscribe(
      (data) => {
        this.lon = Number(data.longitude);
        this.lat = Number(data.latitude);
        this.latlng = new L.LatLng(this.lat, this.lon);
        this.map = L.map('kartta').setView(this.latlng, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          maxZoom: 18,
          minZoom: 3,
        }).addTo(this.map);

        L.control.scale().addTo(this.map);
        L.marker(this.latlng).bindPopup('Asema').addTo(this.map);
      },

      // Jos tulee virheitä
      (err) => {
        console.log(err);
      }
    );
  }
}
