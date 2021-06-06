import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; // kirjasto jwt:n käsittelyyn
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:3000/users/login'; // autentikaatiopalvelun osoite
  public token: string;
  private jwtHelp = new JwtHelperService(); // helpperipalvelu jolla dekoodataan token
  private subject = new Subject<any>(); // subjectilla viesti navbariin että token on tullut

  constructor(private http: HttpClient) {
    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.token = currentUser && currentUser.token;
  }
  /* login-metodi ottaa yhteyden backendin autentikaatioreittiin, postaa tunnarit
  ja palauttaa Observablena true tai false riippuen siitä saatiinko lähetetyillä
  tunnareilla token backendistä */
  login(username: string, password: string): Observable<boolean> {
    // tässä ei käytetä JSON.stringify -metodia lähtevälle tiedolle
    return this.http
      .post(this.apiUrl, { username: username, password: password })
      .pipe(
        map((res) => {
          console.log(res); // loggaa alla olevan tyylisen vastauksen
          const token = res['token']; // otetaan vastauksesta token
          if (token) {
            this.token = token;
            /* Tässä tutkitaan onko tokenin payloadin sisältö oikea.
             Jos on, laitetaan token sessionStorageen ja palautetaan true
             jolloin käyttäjä pääsee Admin-sivulle
          */
            try {
              // dekoodataan token
              const payload = this.jwtHelp.decodeToken(token);
              console.log(payload);
              // Tässä voidaan tarkistaa tokenin oikeellisuus
              if (payload.username === username && payload.isadmin === true) {
                // token sessionStorageen
                sessionStorage.setItem(
                  'accesstoken',
                  JSON.stringify({ username: username, adminlogin: true, token: token })
                );
                this.loginTrue(); // lähetetään viesti navbariin että vaihdetaan login:true -tilaan
                console.log('admin login onnistui');
                return true; // saatiin token
              } else if (payload.username === username && payload.isadmin === false) {
                // token sessionStorageen
                sessionStorage.setItem(
                  'accesstoken',
                  JSON.stringify({ username: username, adminlogin: false, token: token })
                );
                this.loginTrue(); // lähetetään viesti navbariin että vaihdetaan login:true -tilaan
                console.log('käyttäjä login onnistui');
                return true; // saatiin token
              } else {
                console.log('login epäonnistui');
                return false; // ei saatu tokenia
              }
            } catch (err) {
              return false;
            }
          } else {
            console.log('tokenia ei ole');
            return false;
          }
        })
      );
  }
  /* Ilmoitetaan navbariin että koska ollaan loggauduttu,
     niin Logout on mahdollista tehdä, joten vaihdetaan navbariin login-linkin
     tilalle logout-linkki
  */
  loginTrue(): Observable<any> {
    this.subject.next(true);
    return this.subject.asObservable();
  }

  // logout poistaa tokenin sessionStoragesta
  logout(): void {
    this.token = null;
    sessionStorage.removeItem('accesstoken');
  }
}
