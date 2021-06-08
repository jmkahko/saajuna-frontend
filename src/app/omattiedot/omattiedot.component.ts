import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

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
  public username: string;

  // injektoidaan router ja authService
  constructor(
    private router: Router,
    private authService: AuthService) {
      // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
      const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
      this.username = currentUser && currentUser.username;

    }

    ngOnInit() {

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

}
