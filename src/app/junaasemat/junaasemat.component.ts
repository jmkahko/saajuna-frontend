import { Component, OnInit } from '@angular/core';
import { JunaAsemaService } from '../juna-asema.service';
import { RautatieAsemat } from '../rautatieAsemat';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-junaasemat',
  templateUrl: './junaasemat.component.html',
  styleUrls: ['./junaasemat.component.css']
})
export class JunaasematComponent implements OnInit {

  rautatietasemat : Array<RautatieAsemat> = []; // Rautatieasemien taulukko johon asemat haetaan käynnistyksessä

  // injektoidaan router ja authService
  constructor(
    private junaAsematService: JunaAsemaService) {
      // Haetaan rautatieasemat rautatieasemat taulukkoon
      this.junaAsematService.haeAsemat().subscribe(data => this.rautatietasemat = data);

    }

  ngOnInit(): void {
  }

  haeRautatieasema(formData) {

  }



}
