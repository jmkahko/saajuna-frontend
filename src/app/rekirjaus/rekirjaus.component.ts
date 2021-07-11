import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-rekirjaus',
  templateUrl: './rekirjaus.component.html',
  styleUrls: ['./rekirjaus.component.css']
})
export class RekirjausComponent implements OnInit {
  error = ''; // Virhetietojen näyttämistä html sivulla
  naytasalasana: boolean; // Salasanan näyttäminen
  rekisterointi: boolean; // Onko rekisteröinti onnistunut

  // injektoidaan router ja authService
  constructor(private router: Router,
    private authService: AuthService) {
    }

  ngOnInit() {
    // aina kun login-komponentti ladataan, poistetaan token
    this.authService.logout();
  }

  // lomakkeen lähetys, authService palauttaa observablen jossa on joko true tai false
  onSubmit(formData) {
    this.authService.login(formData.tunnus, formData.salasana)
      .subscribe(result => {
        if (result === true) {
          // Tarkistaan, että onko admin kirjautuminen, jos on mennään omat tiedot sivustolle ja muuten etusivulle
          if(formData.tunnus === 'admin') {
            this.router.navigate(['/omattiedot']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.error = 'Tunnus tai salasana väärä';
        }
      });
  }

  // Näytetäänkö salasana html sivulla
  naytasalasanaType() {
    this.naytasalasana = !this.naytasalasana;
  }

}
