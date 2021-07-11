import { Component, OnInit, AfterViewInit } from '@angular/core'; // AfterViewInit otetaan sen jälkeen vasta ajoon, kun html sivu on ladattu kokonaan.
import { ActivatedRoute } from '@angular/router'; // Tämän avulla saadaan tietoa reitistä  komponenttiin
import { JunaService } from '../juna.service';

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
  selector: 'app-junantiedot',
  templateUrl: './junantiedot.component.html',
  styleUrls: ['./junantiedot.component.css'],
})
export class JunantiedotComponent implements AfterViewInit, OnInit {
  // Esitellään tarvittavat komponentit junan aikataulutieto
  public junaaikataulu;
  public junanpaikka;
  public aika;
  time: string;

  // Esitellään junanpaikka tietoa kartalla varten
  private map: any;
  latlng: L.LatLng;
  lat: number;
  lon: number;
  juna: number;
  nopeus: number;

  constructor(private route: ActivatedRoute, private junaService: JunaService) {
    // Asetetaan sijantitietoja, nopeutta ja junanumeroa varten aloitusarvot
    this.lat = 0;
    this.lon = 0;
    this.juna = 0;
    this.nopeus = 0;
    this.latlng = new L.LatLng(this.lat, this.lon);
  }

  // Nämä ajetaan heti kun sivu latautuu
  ngOnInit(): void {
    this.haeAikataulu();
    this.haeJunaPaikkatietoParameter();
  }

  // Jutut jotka tehdään sitten kun templaatti eli html-osa on latautunut muistiin
  ngAfterViewInit() {
    this.haeJunaSijaintiKartalla();
  }

  // Haetaan junan aikataulutiedot
  haeAikataulu(): void {
    const aika = this.route.snapshot.paramMap.get('aika'); // aika tieto on string, josta johtuen ei muuteta numeroksi
    const junanumero = Number(this.route.snapshot.paramMap.get('junanumero')); // junanumero tieto on numero, josta johtuen muutetaan numeroksi tieto

    // Haetaan junaaikataulu muuttujaan junan aikataulu tieto
    this.junaService
      .haeAikataulu(aika, junanumero)
      .subscribe((junaaikataulu) => (this.junaaikataulu = junaaikataulu));
  }

  // Haetaan junan viimeisin paikkatieto parametritietoja
  haeJunaPaikkatietoParameter(): void {
    const aika = this.route.snapshot.paramMap.get('aika'); // aika tieto on string, josta johtuen ei muuteta numeroksi
    const junanumero = Number(this.route.snapshot.paramMap.get('junanumero')); // junanumero tieto on numero, josta johtuen muutetaan numeroksi tieto

    // Haetaan junanpaikka muuttujaan junan sijaintitieto
    this.junaService
      .haePaikkatieto(aika, junanumero)
      .subscribe((junanpaikka) => (this.junanpaikka = junanpaikka));
  }

  // Junan sijainti kartalla
  haeJunaSijaintiKartalla(): void {
    const aika = this.route.snapshot.paramMap.get('aika'); // aika tieto on string, josta johtuen ei muuteta numeroksi
    const junanumero = Number(this.route.snapshot.paramMap.get('junanumero')); // junanumero tieto on numero, josta johtuen muutetaan numeroksi tieto

    // Haetaan junanpaikka muuttujaan junan sijaintitieto
    this.junaService.haePaikkatieto(aika, junanumero).subscribe(
      (data) => {
        // Haetaan jokainen tieto omaan muuttujaan data[0] tarkoittaa, että otetaan viimeisin tieto. Koska muuten näkyisi kartalla koko junanmatka.
        this.lon = data['location']['coordinates'][0]; // Longitude sijainti
        this.lat = data['location']['coordinates'][1]; // Latitude sijainti
        this.juna = data['trainNumber']; // Juna numero
        this.aika = data['timestamp']; // Sijainnin aika
        this.nopeus = data['speed']; // Junan nopeus

        // Junan paikka haetaan
        this.latlng = new L.LatLng(this.lat, this.lon);

        // 'kartta' viittaus on html kohtaan <div id="kartta"></div>
        this.map = L.map('kartta').setView(this.latlng, 10);

        // add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          maxZoom: 18,
          minZoom: 3,
        }).addTo(this.map);

        // show the scale bar on the lower left corner
        L.control.scale().addTo(this.map);

        // show a marker on the map / Missä näkyy sininen merkki ja siitä kun painaa niin tulee oheinen teksti näkyviin
        L.marker(this.latlng)
          .bindPopup('Juna: ' + this.juna)
          .addTo(this.map);
      },

      // Jos tulee virheitä
      (err) => {
        console.log(err);
      }
    );
  }
}
