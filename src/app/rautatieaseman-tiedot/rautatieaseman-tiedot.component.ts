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

}
