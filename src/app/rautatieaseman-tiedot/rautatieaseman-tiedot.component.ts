import { Component, Input, OnInit } from '@angular/core';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';
import { JunaAsemaService } from '../juna-asema.service';
import { HavaintoasemaService } from '../havaintoasema.service';
import { SaaService } from '../saa.service';

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

  constructor(
    private route: ActivatedRoute,
    private junaAsematService: JunaAsemaService,
    private HavaintoAsematService: HavaintoasemaService,
    private SaaService: SaaService
  ) {}

  // Kun komponentti syntyy muistiin, rautatieaseman tiedot tulevat komponenttiin id:n perusteella
  ngOnInit(): void {
    this.haeAsema();
    this.haeAsemanAikataulu();
    this.haeSaaEnnuste();
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
    // Kiinteät muuttujat alkuun
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

  haeSaaEnnuste(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.junaAsematService.haeAsema(id).subscribe((data: any) => {
      this.SaaService.haeSaaEnnuste(
        data.latitude + ',' + data.longitude
      ).subscribe((saaennuste) => (this.saaennuste = saaennuste));
    });
  }

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
}
