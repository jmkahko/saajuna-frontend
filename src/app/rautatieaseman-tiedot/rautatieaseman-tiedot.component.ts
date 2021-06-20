import { Component, Input, OnInit } from '@angular/core';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';

// Tuodaan rautatieasemien tiedot
import { RautatieAsemat } from '../rautatieAsemat';
import { JunaAsemaService } from '../juna-asema.service';
import { SplitInterpolation } from '@angular/compiler';
import { nextTick } from 'process';

@Component({
  selector: 'app-rautatieaseman-tiedot',
  templateUrl: './rautatieaseman-tiedot.component.html',
  styleUrls: ['./rautatieaseman-tiedot.component.css']
})
export class RautatieasemanTiedotComponent implements OnInit {

  // Rautatieaseman tiedot tulevat heti alkuun
  station;
  aikataulu;
  stationsortcode;

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
    const station = 'HKI';
    const arrived_trains = 0;
    const arriving_trains = 2;
    const departed_trains = 0;
    const departing_trains = 2;

    // Haetaan halutun aseman lyhytkoodi
    const id = this.route.snapshot.paramMap.get('id'); // id tieto on string, josta johtuen ei muuteta numeroksi
    this.junaAsematService.haeAsema(id)
      .subscribe(stationsortcode => this.stationsortcode = stationsortcode.stationShortCode);

    // Haetaan aikataulu aseman lyhytkoodilla
    this.junaAsematService.haeAsemanAikataulu(station, arrived_trains, arriving_trains, departed_trains, departing_trains)
      .subscribe(aikataulu => this.aikataulu = aikataulu);
  }



}
