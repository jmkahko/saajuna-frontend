import { Component, OnInit } from '@angular/core';
import { JunaAsemaService } from '../juna-asema.service';
import { RautatieAsemat } from '../rautatieAsemat';

@Component({
  selector: 'app-junaasemat',
  templateUrl: './junaasemat.component.html',
  styleUrls: ['./junaasemat.component.css']
})
export class JunaasematComponent implements OnInit {
  rautatieasemat: Array<RautatieAsemat> = []; // Rautatieasemien taulukko johon asemat haetaan käynnistyksessä

  stations: Array<RautatieAsemat> = []; // Tyhjä taulukko jota käytetään rautatieasemien hakuun

  constructor(
    private junaAsematService: JunaAsemaService) {
      // Haetaan rautatieasemat rautatieasemat taulukkoon
      this.junaAsematService.haeAsemat().subscribe(data => this.rautatieasemat = data);
    }
  
  // Rautatieaseman haku
  search(term: string): void {
    this.stations = this.rautatieasemat.filter((str) => {
      return str.stationName.toLocaleLowerCase().indexOf(term.toLowerCase()) >= 0;
    })
  }

  ngOnInit(): void {

  }

}