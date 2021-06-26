import { Component, OnInit } from '@angular/core';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';
import { SaaService } from '../saa.service';

@Component({
  selector: 'app-havaintoasematiedot',
  templateUrl: './havaintoasematiedot.component.html',
  styleUrls: ['./havaintoasematiedot.component.css'],
})
export class HavaintoasematiedotComponent implements OnInit {
  havaintoasema;
  saanyt;
  saaennuste;

  constructor(
    private route: ActivatedRoute,
    private HavaintoAsematService: HavaintoasemaService,
    private SaaService: SaaService
  ) {}

  ngOnInit(): void {
    this.haeHavaintoAsema();
    this.haeSaaNyt();
    this.haeSaaEnnuste();
  }

  haeHavaintoAsema(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.HavaintoAsematService.haeHavaintoAsema(id).subscribe(
      (havaintoasema) => (this.havaintoasema = havaintoasema)
    );
  }

  haeSaaNyt(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.HavaintoAsematService.haeHavaintoAsema(id).subscribe((data: any) => {
      this.SaaService.haeSaaNyt(data.fmisid).subscribe(
        (saanyt) => (this.saanyt = saanyt)
      );
    });
  }

  haeSaaEnnuste(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.HavaintoAsematService.haeHavaintoAsema(id).subscribe((data: any) => {
      this.SaaService.haeSaaEnnuste(
        data.latitude + ',' + data.longitude
      ).subscribe((saaennuste) => (this.saaennuste = saaennuste));
    });
  }

  haeSaaEnnusteold(): void {
    this.SaaService.haeSaaEnnuste('64.22,27.75').subscribe(
      (saaennuste) => (this.saaennuste = saaennuste)
    );
  }
}
