import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kirjaudu',
  templateUrl: './kirjaudu.component.html',
  styleUrls: ['./kirjaudu.component.css']
})
export class KirjauduComponent implements OnInit {
  error = '';

  // injektoidaan router ja authService
  constructor(private router: Router,
    private authService: AuthService) {

     }

  ngOnInit() {
    // aina kun login-komponentti ladataan, poistetaan token
    this.authService.logout();
  }

  // lomakkeen lähetys
  // authService palauttaa observablen jossa on joko true tai false
  onSubmit(formData) {
    this.authService.login(formData.tunnus, formData.salasana)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Tunnus tai salasana väärä';
        }
      });
  }
}

