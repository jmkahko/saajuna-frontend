import { Component, OnInit } from '@angular/core';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';

@Component({
  selector: 'app-havaintoasemat',
  templateUrl: './havaintoasemat.component.html',
  styleUrls: ['./havaintoasemat.component.css'],
})
export class HavaintoasematComponent implements OnInit {
  havaintoasemat: Array<HavaintoAsemat> = []; // Säähavaintoasemat haetaan tähän tauluun
  hasemat: Array<HavaintoAsemat> = []; // Tämä on alussa tyhjä ja kun haku kenttään syötetään tekstiä, niin tähän tauluun viedään ja haetaan

  constructor(private havaintoAsemaService: HavaintoasemaService) {
    // Haetaan säähavaintoasemat
    this.havaintoAsemaService
      .haeHavaintoAsemat()
      .subscribe((data) => (this.havaintoasemat = data));
  }

  // Haetaan säähavaintoasema
  search(term: string): void {
    // Kun kirjaimia on syötetty 2 tai enemmän, näytetään maksimissaan 10 hakutulosta
    if (term.length > 1) {
      this.hasemat = this.havaintoasemat.filter((str) => {
        return str.name.toLocaleLowerCase().indexOf(term.toLowerCase()) >= 0;
      }).slice(0,10);
    }

    // Kun kirjaimia on syötetty 0 niin ei näytetä yhtään hakutulosta listasta
    if (term.length === 0) {
      this.hasemat = this.havaintoasemat.filter((str) => {
        return str.name.toLocaleLowerCase().indexOf(term.toLowerCase()) >= 0;
      }).slice(0,0);
    }
  }

  ngOnInit(): void {}
}

