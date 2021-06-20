import { Component, OnInit } from '@angular/core';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';

@Component({
  selector: 'app-havaintoasemat',
  templateUrl: './havaintoasemat.component.html',
  styleUrls: ['./havaintoasemat.component.css'],
})
export class HavaintoasematComponent implements OnInit {
  // havaintoasemat$: Observable<HavaintoAsemat[]>;
  havaintoasemat: Array<HavaintoAsemat> = [];
  hasemat: Array<HavaintoAsemat> = [];

  constructor(private havaintoAsemaService: HavaintoasemaService) {
    this.havaintoAsemaService
      .haeHavaintoAsemat()
      .subscribe((data) => (this.havaintoasemat = data));
  }
  // Push a search term into the observable stream.
  search(term: string): void {
    // subject vastaanottaa hakutermin
    // this.searchTerms.next(term);
    this.hasemat = this.havaintoasemat.filter((str) => {
      return str.name.toLocaleLowerCase().indexOf(term.toLowerCase()) >= 0;
    });
  }

  ngOnInit(): void {}
}
