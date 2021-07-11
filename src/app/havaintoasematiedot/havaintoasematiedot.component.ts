import { Component, OnInit } from '@angular/core';
import { HavaintoasemaService } from '../havaintoasema.service';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-havaintoasematiedot',
  templateUrl: './havaintoasematiedot.component.html',
  styleUrls: ['./havaintoasematiedot.component.css'],
})
export class HavaintoasematiedotComponent implements OnInit {
  havaintoasema; // Haetaan reitistä tullut havaintoaseman tiedot
  saanyt; // Säänyt tiedot viedään html sivulle
  saaennuste; // Sääennusteen tiedot viedään html sivulle
  time: string; // Aika

  // Karttaa varten
  private map: any;
  latlng: L.LatLng;
  lat: number;
  lon: number;

  constructor(
    private route: ActivatedRoute,
    private HavaintoAsematService: HavaintoasemaService,
    private SaaService: SaaService
  ) {
    // Alustetaan kartta nolla koordinaateilla
    this.lat = 0;
    this.lon = 0;
    this.latlng = new L.LatLng(this.lat, this.lon);
  }

  ngOnInit(): void {
    this.haeHavaintoAsema();
    this.haeSaaNyt();
    this.haeSaaEnnuste();
  }

  // Haetaan sääaseman tiedot kartalle, kun tiedot on ladattu.
  ngAfterViewInit() {
    this.haeAsemanSijaintiKartalla();
  }

  // Haetaan säähavaintoaseman tiedot, jotka tulevat reitissä
  haeHavaintoAsema(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.HavaintoAsematService.haeHavaintoAsema(id).subscribe(
      (havaintoasema) => (this.havaintoasema = havaintoasema)
    );
  }

  // Haetaan säähavaintoaseman tämän hetkinen sää.
  haeSaaNyt(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.HavaintoAsematService.haeHavaintoAsema(id).subscribe((data: any) => {
      this.SaaService.haeSaaNyt(data.fmisid).subscribe(
        (saanyt) => (this.saanyt = saanyt)
      );
    });
  }

  // Haetaan säähavaintoaseman koordinaattien kuluvan tunnin sääennuste.
  haeSaaEnnuste(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.HavaintoAsematService.haeHavaintoAsema(id).subscribe((data: any) => {
      this.SaaService.haeSaaEnnuste(
        data.latitude + ',' + data.longitude
      ).subscribe((saaennuste) => (this.saaennuste = saaennuste));
    });
  }

  // Näytetään säähavaintoaseman koordinaattien pohjalta sen paikka kartalla.
  haeAsemanSijaintiKartalla(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Haetaan säähavaintoaseman tiedot id:n perusteella.
    this.HavaintoAsematService.haeHavaintoAsema(id).subscribe(
      (data) => {
        // Havaintoaseman koordinaatit muutetaan numero muotoon ja asetaan muuttujiin.
        this.lon = Number(data.longitude);
        this.lat = Number(data.latitude);

        // Haetaan koordinaattien pohjalta oikea kohta kartalla.
        this.latlng = new L.LatLng(this.lat, this.lon);
        this.map = L.map('kartta').setView(this.latlng, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          maxZoom: 18,
          minZoom: 3,
        }).addTo(this.map);

        L.control.scale().addTo(this.map);
        L.marker(this.latlng).bindPopup('Säähavaintoasema').addTo(this.map);
      },

      // Jos tulee virheitä
      (err) => {
        console.log(err);
      }
    );
  }

  // Näytetään tuulensuunnan teksti
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

  // Näytetään tuulensuunnan kuva. Ikonit löytyvät assets/symbols-kansiosta
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

  // Näytetään tuulen puuska tekstinä
  tuulenPuuska(tpuuskanro: number) {
    if (tpuuskanro < 1) {
      return 'tyyntä';
    } else if (tpuuskanro >= 1 && tpuuskanro < 4) {
      return 'heikkoa';
    } else if (tpuuskanro >= 4 && tpuuskanro < 8) {
      return 'kohtalaista';
    } else if (tpuuskanro >= 8 && tpuuskanro < 14) {
      return 'navakkaa';
    } else if (tpuuskanro >= 14 && tpuuskanro < 21) {
      return 'kovaa';
    } else if (tpuuskanro >= 21 && tpuuskanro <= 32) {
      return 'myrskyä';
    } else if (tpuuskanro > 32) {
      return 'hirmumyrsky';
    }
  }

  // Näytetään pilvisyys tieto
  pilvisyys(pilvinro: number) {
    if (pilvinro <= 1) {
      return 'selkeää';
    } else if (pilvinro >= 2 && pilvinro < 7) {
      return 'melko selkeää tai puolipilvistä';
    } else if (pilvinro >= 7 && pilvinro < 9) {
      return 'melko pilvistä tai pilvistä';
    } else if (pilvinro >= 9) {
      return 'pilvisyyttä ei voi määrittää';
    }
  }

  // Haetaan sääsymbolia vastaava teksti tieto
  saaSymbolit(luku) {
    let teksti = '';
    switch (luku) {
      case 0:
        teksti = 'Ei merkittäviä sääilmiöitä.';
        break;
      case 4:
        teksti =
          'Auerta, savua tai ilmassa leijuvaa pölyä ja näkyvyys väh. 1 km.';
        break;
      case 5:
        teksti =
          'Auerta, savua tai ilmassa leijuvaa pölyä ja näkyvyys alle 1km.';
        break;
      case 10:
        teksti = 'Utua';
        break;
      case 20:
        teksti = 'Sumua';
        break;
      case 21:
        teksti = 'Sadetta';
        break;
      case 22:
        teksti = 'Tihkusadetta';
        break;
      case 23:
        teksti = 'Vesisadetta';
        break;
      case 24:
        teksti = 'Lumisadetta';
        break;
      case 25:
        teksti = 'Jäätävää vesisadetta tai jäätävää tihkua';
        break;
      case 30:
        teksti = 'Sumua';
        break;
      case 31:
        teksti = 'Sumua tai jääsumua erillisinä hattaroina';
        break;
      case 32:
        teksti =
          'Sumua tai jääsumua, joka on ohentunut edellisen tunnin aikana';
        break;
      case 33:
        teksti =
          'Sumua tai jääsumua, jonka tiheydessä ei ole tapahtunut merkittäviä muutoksia ed. tunnin aikana';
        break;
      case 34:
        teksti =
          'Sumua tai jääsumua, joka on muodostunut tai tullut sakeammaksi ed. tunnin aikana';
        break;
      case 40:
        teksti = 'Sadetta';
        break;
      case 41:
        teksti = 'Heikkoa tai kohtalaista sadetta';
        break;
      case 42:
        teksti = 'Kovaa sadetta';
        break;
      case 50:
        teksti = 'Tihkusadetta (heikkoa, ei jäätävää)';
        break;
      case 51:
        teksti = 'Heikkoa tihkusadetta, joka ei ole jäätävää';
        break;
      case 52:
        teksti = 'Kohtalaista tihkusadetta, joka ei ole jäätävää';
        break;
      case 53:
        teksti = 'Kovaa tihkusadetta, joka ei ole jäätävää';
        break;
      case 54:
        teksti = 'Jäätävää heikkoa tihkusadetta';
        break;
      case 55:
        teksti = 'Jäätävää kohtalaista tihkusadetta';
        break;
      case 56:
        teksti = 'Jäätävää kovaa tihkusadetta';
        break;
      case 60:
        teksti = 'Vesisadetta';
        break;
      case 61:
        teksti = 'Heikkoa vesisadetta, joka ei ole jäätävää';
        break;
      case 62:
        teksti = 'Kohtalaista vesisadetta, joka ei ole jäätävää';
        break;
      case 63:
        teksti = 'Kovaa vesisadetta, joka ei ole jäätävää';
        break;
      case 64:
        teksti = 'Jäätävää heikkoa vesisadetta';
        break;
      case 65:
        teksti = 'Jäätävää kohtalaista vesisadetta';
        break;
      case 66:
        teksti = 'Jäätävää kovaa vesisadetta';
        break;
      case 67:
        teksti = 'Heikkoa lumensekaista vesisadetta tai tihkua (räntää)';
        break;
      case 68:
        teksti =
          'Kohtalaista tai kovaa lumensekaista vesisadetta tai tihkua (räntää)';
        break;
      case 70:
        teksti = 'Lumisadetta';
        break;
      case 71:
        teksti = 'Heikkoa lumisadetta';
        break;
      case 72:
        teksti = 'Kohtalaista lumisadetta';
        break;
      case 73:
        teksti = 'Tiheää lumisadetta';
        break;
      case 74:
        teksti = 'Heikkoa jääjyväsadetta';
        break;
      case 75:
        teksti = 'Kohtalaista jääjyväsadetta';
        break;
      case 76:
        teksti = 'Kovaa jääjyväsadetta';
        break;
      case 77:
        teksti = 'Lumijyväsiä';
        break;
      case 78:
        teksti = 'Jääkiteitä';
        break;
      case 80:
        teksti = 'Kuuroja tai ajoittaista sadetta (heikkoja)';
        break;
      case 81:
        teksti = 'Heikkoja vesikuuroja';
        break;
      case 82:
        teksti = 'Kohtalaisia vesikuuroja';
        break;
      case 83:
        teksti = 'Kovia vesikuuroja';
        break;
      case 84:
        teksti = 'Ankaria vesikuuroja (> 32 mm/h)';
        break;
      case 85:
        teksti = 'Heikkoja lumikuuroja';
        break;
      case 86:
        teksti = 'Kohtalaisia lumikuuroja';
        break;
      case 87:
        teksti = 'Kovia lumikuuroja';
        break;
      case 89:
        teksti =
          'Raekuuroja mahdollisesti yhdessä vesi- tai räntäsateen kanssa';
        break;
    }
    return teksti;
  }
}
