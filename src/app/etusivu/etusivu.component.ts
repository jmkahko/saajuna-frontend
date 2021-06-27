import { Component, Input, OnInit } from '@angular/core';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../favorite.service';
import { HavaintoasemaService } from '../havaintoasema.service';
import { JunaAsemaService } from '../juna-asema.service';
import { SaaService } from '../saa.service';

@Component({
  selector: 'app-etusivu',
  templateUrl: './etusivu.component.html',
  styleUrls: ['./etusivu.component.css'],
})
export class EtusivuComponent implements OnInit {
  aikataulu; // Rautatieaseman aikataulu html sivulle
  suosikit; // Suosikki tietojen haku
  username; // Käyttäjänimi
  saanyt; // Säätiedot etusivulle
  suosikkisaa1;
  suosikkisaa2;
  suosikkirautatie1;
  suosikkirautatie2;
  login: boolean; //tarkistetaan onko käyttäjä kirjautuneena sisään

  constructor(
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    private SaaService: SaaService,
    private HavaintoAsematService: HavaintoasemaService,
    private junaAsematService: JunaAsemaService
  ) {
    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.username = currentUser && currentUser.username;

    // if (this.username !== null)
    if (this.login == true) {
      this.haeSuosikitRautatie1(this.username);
      this.haeSuosikitRautatie2(this.username);
      this.haeSuosikitSää1(this.username);
      this.haeSuosikitSää2(this.username);
    }
    /* varmistetaan että login -tila säilyy myös kun sivu päivitetään
       varmistus tehdään katsomalla onko token sessionstoragessa.
       Yllä oleva observablen tilaus silti tarvitaan, sillä sessionstoragen
       tarkistus vaatii aina reffauksen koska sitä ei voi kutsua asynkronisesti. */
    const atoken = sessionStorage.getItem('accesstoken');
    if (atoken) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  ngOnInit(): void {}

  // Hae suosikki sää- ja rautatieasemat
  haeSuosikitRautatie1(username) {
    this.favoriteService.haeSuosikit(username).subscribe((data: any) => {
      this.junaAsematService
        .haeAsemanAikataulu(data.favoritesJuna1, 0, 1, 0, 1)
        .subscribe((aikataulu) => (this.suosikkirautatie1 = aikataulu));
    });
  }

  haeSuosikitRautatie2(username) {
    this.favoriteService.haeSuosikit(username).subscribe((data: any) => {
      this.junaAsematService
        .haeAsemanAikataulu(data.favoritesJuna2, 0, 1, 0, 1)
        .subscribe((aikataulu) => (this.suosikkirautatie2 = aikataulu));
    });
  }

  haeSuosikitSää1(username) {
    this.favoriteService.haeSuosikit(username).subscribe((data: any) => {
      this.SaaService.haeSaaNyt(data.favoritesSaa1).subscribe(
        (saanyt) => (this.suosikkisaa1 = saanyt)
      );
    });
  }

  haeSuosikitSää2(username) {
    this.favoriteService.haeSuosikit(username).subscribe((data: any) => {
      this.SaaService.haeSaaNyt(data.favoritesSaa2).subscribe(
        (saanyt) => (this.suosikkisaa2 = saanyt)
      );
    });
  }
}
