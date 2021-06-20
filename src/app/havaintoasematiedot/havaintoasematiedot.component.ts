import { Component, OnInit } from '@angular/core';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-havaintoasematiedot',
  templateUrl: './havaintoasematiedot.component.html',
  styleUrls: ['./havaintoasematiedot.component.css'],
})
export class HavaintoasematiedotComponent implements OnInit {
  havaintoasema;

  constructor(
    private route: ActivatedRoute,
    private HavaintoAsematService: HavaintoasemaService
  ) {}

  ngOnInit(): void {
    this.haeHavaintoAsema();
  }

  haeHavaintoAsema(): void {
    const id = this.route.snapshot.paramMap.get('fmisid');
    this.HavaintoAsematService.haeHavaintoAsema(id).subscribe(
      (havaintoasema) => (this.havaintoasema = havaintoasema)
    );
  }
}
