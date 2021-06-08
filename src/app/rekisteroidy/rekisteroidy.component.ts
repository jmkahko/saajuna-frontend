import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-rekisteroidy',
  templateUrl: './rekisteroidy.component.html',
  styleUrls: ['./rekisteroidy.component.css']
})
export class RekisteroidyComponent implements OnInit {
  error = '';
  // injektoidaan router ja authService
  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

  }

  // lomakkeen lähetys
  // authService palauttaa observablen jossa on joko true tai false
  onSubmit(formData, isFormValid: boolean) {
    this.authService.rekisteroidy(formData.tunnus, formData.salasana)
      .subscribe(result => {
        if (result === true) {
          this.error = 'Rekisteröinti onnistui'
          this.router.navigate(['/omattiedot']);
        } else {
          this.error = 'Rekisteröinti epäonnistui';
        }
      });
  }

}



