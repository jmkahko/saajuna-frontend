import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';

@Component({
  selector: 'app-havaintoasemat',
  templateUrl: './havaintoasemat.component.html',
  styleUrls: ['./havaintoasemat.component.css'],
})
export class HavaintoasematComponent implements OnInit {
  havaintoasemat: Array<HavaintoAsemat> = [];

  constructor(private havaintoAsemaService: HavaintoasemaService) {
    this.havaintoAsemaService
      .haeHavaintoAsema()
      .subscribe((data) => (this.havaintoasemat = data));
  }

  ngOnInit(): void {}
  haeHavaintoAsema(formdata) {}
}
