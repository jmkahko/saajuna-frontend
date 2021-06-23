import { Component, Input, OnInit } from '@angular/core';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';
import { JunaAsemaService } from '../juna-asema.service';

@Component({
  selector: 'app-rautatieaseman-tiedot',
  templateUrl: './rautatieaseman-tiedot.component.html',
  styleUrls: ['./rautatieaseman-tiedot.component.css']
})
export class RautatieasemanTiedotComponent implements OnInit {

  // Rautatieaseman tiedot tulevat heti alkuun
  station; // Rautatieaseman tiedot html sivulle
  aikataulu; // Rautatieaseman aikataulu html sivulle
  aika; // Aikatieto html sivustolle

  constructor(
    private route: ActivatedRoute,
    private junaAsematService: JunaAsemaService
  ) { }

  // Kun komponentti syntyy muistiin, rautatieaseman tiedot tulevat komponenttiin id:n perusteella
  ngOnInit(): void {
    this.haeAsema();
    this.haeAsemanAikataulu();
    this.haeAika();
  }

  // Haetaan rautatieaseman tiedot id:n perusteella
  haeAsema(): void {
    const id = this.route.snapshot.paramMap.get('id'); // id tieto on string, josta johtuen ei muuteta numeroksi
    this.junaAsematService.haeAsema(id)
      .subscribe(station => this.station = station);
  }

  // Haetaan aseman aikataulu
  haeAsemanAikataulu(): void {
    // Kiinteät muuttujat alkuun
    const arrived_trains = 0;
    const arriving_trains = 5;
    const departed_trains = 0;
    const departing_trains = 5;

    // Haetaan halutun aseman lyhytkoodi
    const id = this.route.snapshot.paramMap.get('id'); // id tieto on string, josta johtuen ei muuteta numeroksi
    this.junaAsematService.haeAsema(id)
      .subscribe((data: any) => {
        // Haetaan rautatieaseman aikataulu seuraavaksi
        this.junaAsematService.haeAsemanAikataulu(data.stationShortCode, arrived_trains, arriving_trains, departed_trains, departing_trains)
        .subscribe(aikataulu => this.aikataulu = aikataulu);
      });
  }

  haeAika(): void {
    let aika1 = new Date();
    aika1.setSeconds(0, 0); // Määritellään ajasta sekunnit ja millisekunnit nolliksi

    // Ajan muunnoksia (vuosi, kuukausi, päivä). 
    let vuosi = aika1.getFullYear();
    let kuukausi = aika1.getMonth() + 1;
    let paiva = aika1.getDate();

    // Muodostetaan aika hakua varten määrämuotoisena
    this.aika =
      vuosi + '-' + kuukausi + '-' + paiva;


    console.log('Aika muutoksen jälkeen ' + this.aika);
  }

}
