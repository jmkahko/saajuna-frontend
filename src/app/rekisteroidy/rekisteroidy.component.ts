import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FavoriteService } from '../favorite.service';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';
import { JunaAsemaService } from '../juna-asema.service';
import { RautatieAsemat } from '../rautatieAsemat';
import { Observable, OperatorFunction } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rekisteroidy',
  templateUrl: './rekisteroidy.component.html',
  styleUrls: ['./rekisteroidy.component.css'],
  providers: [NgbTypeaheadConfig], // add NgbTypeaheadConfig to the component providers
})
export class RekisteroidyComponent implements OnInit {
  // Virheiden näyttämiseen
  error1 = ''; // Html viestien näyttämiseen
  error = ''; // Html viestien näyttämiseen
  naytasalasana: boolean // Salasanan näyttäminen

  // Rautatie- ja säähavaintoasemien hakuun nettisivulla
  formatterRauta = (rauta: RautatieAsemat) => rauta.stationName;
  formatterSaa = (saa: HavaintoAsemat) => saa.name;

  rautatieasemat: Array<RautatieAsemat> = []; // Rautatieasemat taulukko
  havaintoasemat: Array<HavaintoAsemat> = []; // Säähavaintoasemat taulukko

  // injektoidaan router ja authService
  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private junaAsematService: JunaAsemaService,
    private havaintoAsemaService: HavaintoasemaService
  ) {}

  ngOnInit() {
    // Haetaan sivun latautuessa säähavainto- ja rautatieasemat
    this.junaAsematService
      .haeAsemat()
      .subscribe((data) => (this.rautatieasemat = data));
    this.havaintoAsemaService
      .haeHavaintoAsemat()
      .subscribe((data) => (this.havaintoasemat = data));
  }

  // Suosikki säähavainto- ja rautatieasemien hakukentät
  searchRautatie1: OperatorFunction<string, readonly { stationName }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.rautatieasemat
          .filter((rauta) => new RegExp(term, 'mi').test(rauta.stationName))
          .slice(0, 10)
      )
    );

  searchRautatie2: OperatorFunction<string, readonly { stationName }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.rautatieasemat
          .filter((rauta) => new RegExp(term, 'mi').test(rauta.stationName))
          .slice(0, 10)
      )
    );

  searchSaa1: OperatorFunction<string, readonly { name }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.havaintoasemat
          .filter((saa) => new RegExp(term, 'mi').test(saa.name))
          .slice(0, 10)
      )
    );

  searchSaa2: OperatorFunction<string, readonly { name }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.havaintoasemat
          .filter((saa) => new RegExp(term, 'mi').test(saa.name))
          .slice(0, 10)
      )
    );

  // Lomakkeen lähetys
  onSubmit(formData, isFormValid: boolean) {
    // Esitellään sää- ja junaasemien muuttujat
    let lsaa1, lsaa2, ljuna1, ljuna2;

    // Tarkistaan onko tuleva tieto undefined tai tyhjä, jos on tyhjä niin viedään null tieto, muuten tallennetaan tuleva data
    if (formData.favoritesSaa1 === undefined || formData.favoritesSaa1 === '') {
      lsaa1 = null;
    } else {
      lsaa1 = formData.favoritesSaa1.fmisid;
    }

    if (formData.favoritesSaa2 === undefined || formData.favoritesSaa2 === '') {
      lsaa2 = null;
    } else {
      lsaa2 = formData.favoritesSaa2.fmisid;
    }

    if (
      formData.favoritesJuna1 === undefined ||
      formData.favoritesJuna1 === ''
    ) {
      ljuna1 = null;
    } else {
      ljuna1 = formData.favoritesJuna1.stationShortCode;
    }

    if (
      formData.favoritesJuna2 === undefined ||
      formData.favoritesJuna2 === ''
    ) {
      ljuna2 = null;
    } else {
      ljuna2 = formData.favoritesJuna2.stationShortCode;
    }

    // Tiedon tallennus. Tallennetaan käyttäjätiedot käyttäjätauluun ja suosikkitiedot suosikki tauluun
    this.authService.rekisteroidy(formData.tunnus, formData.salasana).subscribe(
      (result) => {
        if (result === true) {
          this.favoriteService
            .lisaaSuosikit(formData.tunnus, lsaa1, lsaa2, ljuna1, ljuna2)
            .subscribe((result) => {
              if (result === true) {
                this.error = 'Rekisteröinti onnistui';
              } else {
                this.error = 'Rekisteröinti epäonnistui';
              }
            });
        } else {
          this.error = 'Rekisteröinti epäonnistui';
        }
      },
      (error) => {
        this.error1 = 'Rekisteröinti epäonnistui';
        console.log('Rekisteröinti epäonnistui');
      }
    );
  }

  // Salasanan näyttäminen
  naytasalasanaType() {
    this.naytasalasana = !this.naytasalasana;
  }

}
