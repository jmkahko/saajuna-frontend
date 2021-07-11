import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnDestroy {
  login: boolean; // Kirjautumistieto
  subscription: Subscription; // Subscription -tyyppiseen olioon voidaan tallentaa observablen tilaus.

  constructor(private authService: AuthService) {
    // Tilataan viesti ja tallennetaan tulos this.login -muuttujaan
    this.subscription = this.authService.loginTrue().subscribe((message) => {
      this.login = message;
    });

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

  ngOnDestroy() {
    // lopetetaan tilaus kun komponentti tuhotaan
    this.subscription.unsubscribe();
  }

  // Kirjaudutaan ulos painike
  doLogout() {
    this.login = false;
  }
  // Navbarin collapse -ohje lainattu tästä linkistä https://medium.com/@tiboprea/build-a-responsive-bootstrap-4-navbar-in-angular-5-without-jquery-c59ad35b007
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
