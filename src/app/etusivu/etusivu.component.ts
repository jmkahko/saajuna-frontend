import { Component, Input, OnInit } from '@angular/core';

// Tämän avulla saadaan tietoa reitistä  komponenttiin
import { FavoriteService } from '../favorite.service';
import { HavaintoasemaService } from '../havaintoasema.service';
import { HavaintoAsemat } from '../havaintoasemat';
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
  junaasema1; // Suosikki 1 juna-asema
  junaasema2; // Suosikki 2 juna-asema
  suosikkisaa1; // Suosikki 1 sääaseman säätiedot
  suosikkisaa2; // Suosikki 2 sääaseman säätiedot
  suosikkisaaasema1; // Suosikki 1 sääasema
  suosikkisaaasema2; // Suosikki 2 sääasema
  suosikkirautatie1; // Suosikki 1 rautatieasema aikataulu
  suosikkirautatie2; // Suosikki 2 rautatieasema aikataulu
  login: boolean; //tarkistetaan onko käyttäjä kirjautuneena sisään
  havaintoasemat: Array<HavaintoAsemat> = []; // Säähavaintoasemat

  constructor(
    private favoriteService: FavoriteService,
    private SaaService: SaaService,
    private junaAsematService: JunaAsemaService,
    private havaintoAsemaService: HavaintoasemaService
  ) {
    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.username = currentUser && currentUser.username;

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

    // Jos login on true haetaan suosikki tiedot
    if (this.login === true) {
      this.haeSuosikit(this.username);
    }
  }

  ngOnInit(): void {}

  // Hae suosikki sää- ja rautatieasemat
  haeSuosikit(username) {
    // Haetaan suosikit
    this.favoriteService.haeSuosikit(username).subscribe((data: any) => {
      // Suosikki 1 rautatieasema
      this.junaAsematService
        .haeAsemanAikataulu(data.favoritesJuna1, 0, 1, 0, 1)
        .subscribe((aikataulu) => (this.suosikkirautatie1 = aikataulu)),
        // Haetaan suosikki rautatieaseman lyhytkoodi
        this.junaAsematService
          .haeAsemaLyhytKoodi(data.favoritesJuna1)
          .subscribe((asema) => (this.junaasema1 = asema)),
        // Suosikki 2 rautatieasema
        this.junaAsematService
          .haeAsemanAikataulu(data.favoritesJuna2, 0, 1, 0, 1)
          .subscribe((aikataulu) => (this.suosikkirautatie2 = aikataulu)),
        // Haetaan suosikki rautatieaseman lyhytkoodi
        this.junaAsematService
          .haeAsemaLyhytKoodi(data.favoritesJuna2)
          .subscribe((asema) => (this.junaasema2 = asema));

      // Suosikki 1 sääasema
      this.SaaService.haeSaaNyt(data.favoritesSaa1).subscribe(
        (saanyt) => (this.suosikkisaa1 = saanyt)
      ),
        // Suosikki 2 sääasema
        this.SaaService.haeSaaNyt(data.favoritesSaa2).subscribe(
          (saanyt) => (this.suosikkisaa2 = saanyt)
        );
    });

    // Haetaan suosikki säähavaintoasemien fmisid numeroille havaintoaseman kokonimet
    this.favoriteService.haeSuosikit(username).subscribe((dataUser: any) => {
      // Haetaan säähavaintoasemat
      this.havaintoAsemaService
        .haeHavaintoAsemat()
        .subscribe((havaintoAsemat) => {
          for (let x = 0; x < havaintoAsemat.length; x++) {
            // Haetaan suosikki 1 säähavaintoaseman kokonimi
            if (havaintoAsemat[x].fmisid === dataUser.favoritesSaa1) {
              this.suosikkisaaasema1 = havaintoAsemat[x].name;
            }

            // Haetaan suosikki 2 säähavaintoaseman kokonimi
            if (havaintoAsemat[x].fmisid === dataUser.favoritesSaa2) {
              this.suosikkisaaasema2 = havaintoAsemat[x].name;
            }
          }
        });
    });
  }

  // Saadaan html sivulle tuulen nopeuden teksti
  tuulenNopeus(tnopeusnro: number) {
    if (tnopeusnro < 1) {
      return 'tyyntä';
    } else if (tnopeusnro >= 1 && tnopeusnro < 4) {
      return 'heikkoa';
    } else if (tnopeusnro >= 4 && tnopeusnro < 8) {
      return 'kohtalaista';
    } else if (tnopeusnro >= 8 && tnopeusnro < 14) {
      return 'navakkaa';
    } else if (tnopeusnro >= 14 && tnopeusnro < 21) {
      return 'kovaa';
    } else if (tnopeusnro >= 21 && tnopeusnro <= 32) {
      return 'myrskyä';
    } else if (tnopeusnro > 32) {
      return 'hirmumyrsky';
    }
  }
}
