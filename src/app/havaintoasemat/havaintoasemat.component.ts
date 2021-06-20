import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-havaintoasemat',
  templateUrl: './havaintoasemat.component.html',
  styleUrls: ['./havaintoasemat.component.css'],
})
export class HavaintoasematComponent implements OnInit {
  // havaintoasemat$: Observable<HavaintoAsemat[]>;
  havaintoasemat: Array<HavaintoAsemat> = [];
  hasemat: Array<HavaintoAsemat> = [];

  // private searchTerms = new Subject<string>();

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
  // haeHavaintoAsema(formdata) {}

  // ngOnInit(): void {
  //   this.havaintoasemat$ = this.searchTerms.pipe(
  //     // wait 300ms after each keystroke before considering the term
  //     // http-pyyntöjä tehdään korkeintaan 300 ms välein (odotusaika)
  //     debounceTime(300),

  //     // ignore new term if same as previous term
  //     // ei tehdä uutta hakua jos termi ei ole muuttunut
  //     distinctUntilChanged(),

  //     // switch to new search observable each time the term changes
  //     // vaihdaliitos vaihtaa palvelimelta tulevaan streamiin, jolla saadaan
  //     // haetut sankarit.
  //     switchMap((term: string) => this.havaintoAsemaService.haeHavaintoAsemat(term))
  //   );
  // }
}
