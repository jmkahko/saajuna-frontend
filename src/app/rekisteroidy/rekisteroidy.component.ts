import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FavoriteService } from '../favorite.service';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';
import { JunaAsemaService } from '../juna-asema.service';
import { RautatieAsemat } from '../rautatieAsemat';
import { FormBuilder } from '@angular/forms';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';


@Component({
  selector: 'app-rekisteroidy',
  templateUrl: './rekisteroidy.component.html',
  styleUrls: ['./rekisteroidy.component.css']
})
export class RekisteroidyComponent implements OnInit {
  // Virheiden näyttämiseen
  error1 = '';
  error = '';

  /* Käytetty

  https://material.angular.io/components/autocomplete/overview
  https://material.angular.io/components/form-field/overview
  https://stackblitz.com/edit/example-angular-material-reactive-form?file=app%2Fapp.component.html

  */


  rautatieasemat: Array<RautatieAsemat> = []; // Rautatieasemat taulukko
  havaintoasemat: Array<HavaintoAsemat> = []; // Säähavaintoasemat taulukko


  // injektoidaan router ja authService
  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private junaAsematService: JunaAsemaService,
    private havaintoAsemaService: HavaintoasemaService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Haetaan kun sivu latautuu säähavainto- ja rautatieasemat
    this.junaAsematService.haeAsemat().subscribe(data => this.rautatieasemat = data);
    this.havaintoAsemaService.haeHavaintoAsemat().subscribe(data => this.havaintoasemat = data);
  }

  search(term: string): void {
    // subject vastaanottaa hakutermin
    // this.searchTerms.next(term);
    this.havaintoasemat = this.havaintoasemat.filter((str) => {
      return str.name.toLocaleLowerCase().indexOf(term.toLowerCase()) >= 0;
    });
  }


  // lomakkeen lähetys
  onSubmit(formData, isFormValid: boolean) {

    console.log(formData);

    console.log('YKSITELLEN TIEDOT SEURAAVAKSI')

    console.log('käyttäjätunnus: ' + formData.tunnus)
    console.log('salasana: ' + formData.salasana)
    console.log('favoritesSaa1: ' + formData.favoritesSaa1)
    console.log('favoritesSaa2: ' + formData.favoritesSaa2)
    console.log('favoritesJuna1: ' + formData.favoritesJuna1)
    console.log('favoritesSaa2: ' + formData.favoritesSaa2)


/*     this.authService.rekisteroidy(formData.tunnus, formData.salasana)
      .subscribe(result => {
        if (result === true) {
          this.favoriteService.lisaaSuosikit(formData.tunnus, formData.favoritesSaa1, formData.favoritesSaa2, formData.favoritesJuna1, formData.favoritesJuna2)
          .subscribe(result => {
            if (result === true) {
              this.error = 'Rekisteröinti onnistui'
              this.router.navigate(['/etusivu']);
            } else {
              this.error = 'Rekisteröinti epäonnistui';
            }
          });
        } else {
          this.error = 'Rekisteröinti epäonnistui';
        }
      },
      (error) => {
        this.error1 = 'Rekisteröinti epäonnistui'
        console.log('Rekisteröinti epäonnistui')
      }); */
    

  }

}





