import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-rekisteroidy',
  templateUrl: './rekisteroidy.component.html',
  styleUrls: ['./rekisteroidy.component.css']
})
export class RekisteroidyComponent implements OnInit {
  error1 = '';
  error = '';
  // injektoidaan router ja authService
  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    private authService: AuthService) { }

  ngOnInit() {

  }

  // lomakkeen lähetys
  // authService palauttaa observablen jossa on joko true tai false
  onSubmit(formData, isFormValid: boolean) {
    this.authService.rekisteroidy(formData.tunnus, formData.salasana)
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
      });
    

  }

}





