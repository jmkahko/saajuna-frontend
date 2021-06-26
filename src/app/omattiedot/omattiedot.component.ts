import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JunaAsemaService } from '../juna-asema.service';
import { RautatieAsemat } from '../rautatieAsemat';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';
import { FavoriteService } from '../favorite.service';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-omattiedot',
  templateUrl: './omattiedot.component.html',
  styleUrls: ['./omattiedot.component.css']
})
export class OmattiedotComponent implements OnInit {
  error = '';
  error1 = '';
  salasanainfo = '';
  poistoinfo = '';
  junainfo = '';
  admintieto = '';
  public username: string;
  rautatietasemat : Array<RautatieAsemat> = [];
  havaintoasemat: Array<HavaintoAsemat> = [];

  // Suosikkeihin liittyvät
  suosikit: Favorite;
  id: string;
  suosikkiUsername: string;
  favoritesSaa1: number;
  favoritesSaa2: number;
  favoritesJuna1: string;
  favoritesJuna2: string;

  // injektoidaan router ja authService
  constructor(
    private router: Router,
    private authService: AuthService,
    private junaAsematService: JunaAsemaService,
    private favoriteService: FavoriteService,
    private havaintoAsemaService: HavaintoasemaService) {
      // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
      const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
      this.username = currentUser && currentUser.username;

      if (this.username === 'admin') {
        this.junaAsematService.haeAsemat().subscribe(data => this.rautatietasemat = data);
        this.havaintoAsemaService.haeHavaintoAsemat().subscribe(data => this.havaintoasemat = data);
      }
    }

  ngOnInit() {
    this.haeSuosikit(this.username);
  }

  salasanvaihto(formData, isFormValid: boolean) {
    // Tarkistetaan onko uusi ja vanha salasan samoja
    if (formData.vanhasalasana !== formData.salasana) {
      // Tarkistetaan onko uusi ja sama uudelleen salasanat samoja
      if (formData.salasana === formData.salasana2) {
        // Tähän laittaa salasanan poistolle pyyntö
        this.authService.vaihdaSalana(formData.salasana)
          .subscribe(result => {
            if (result === true) {
              } else {
                this.salasanainfo = 'Salasana vaihdettu';
              }
          })
      } else {
        this.error = 'Salasanat eivät täsmää';
      }
    } else {
      this.error1 = 'Uusi ja vanha sama salasana'
    }
  }

  // Kun käyttöliittymässä painetaan Tyhjennä nappia poistetaan samalla virheet ja päivitetään Omat tiedot sivusto
  virheidenPoisto() {
    this.error = '';
    this.error1 = '';
    this.router.navigate(['/omattiedot']);
  }

  // Tunnuksen poisto
  poistaTunnus() {
    this.authService.poistaTunnus()
      .subscribe(result => {
      if (result === true) {
        
      } else {
        this.poistoinfo = 'Käyttäjätunnus on poistettu';
      }
    });
  }

  // Rautatieasemien lisäys admin oikeudella
  lisaaJunaAsemat() {
    this.junaAsematService.lisaaAsemat()
      .subscribe(result => {
      if (result === true) {
        
      } else {
        this.junainfo = 'Rautatieasemat lisätty';
      }
    });
  }

  // Rautatieasemien poisto admin oikeudella
  poistaJunaAsemat() {
    this.junaAsematService.poistaAsemat()
      .subscribe(result => {
      if (result === true) {
        
      } else {
        this.junainfo = 'Rautatieasemat poistettu';
      }
    });
  }

  // Hae suosikki sää- ja rautatieasemat
  haeSuosikit(username) {
   this.favoriteService.haeSuosikit(username).subscribe(data => this.suosikit = data);
  }

  // Suosikki sää- ja rautatieasemien päivitys
  suosikkienPaivitys(formData) {
    // Päivitetään tiedot tietokantaan
    this.favoriteService.paivitaSuosikit(this.suosikit._id, formData.favoritesSaa1, formData.favoritesSaa2, formData.favoritesJuna1, formData.favoritesJuna2)
      .subscribe(() => this.haeSuosikit(this.username))
  }

}
