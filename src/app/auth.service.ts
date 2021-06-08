import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; // kirjasto jwt:n käsittelyyn
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
  private apiUrllogin = 'http://localhost:3000/users/login/'; // kirjaudu
  private apiUrlrekisteroidy = 'http://localhost:3000/users/register/'; // rekisteröidy
  private apiUrlsalasanvaihto = 'http://localhost:3000/users/changepassword/'; // salasanan vaihto
  private apiUrltunnuspoisto = 'http://localhost:3000/users/deleteuser/'; // tunnuksen poisto
  public token: string;
  private jwtHelp = new JwtHelperService(); // helpperipalvelu jolla dekoodataan token
  private subject = new Subject<any>(); // subjectilla viesti navbariin että token on tullut
  private id: string;
  public username: string;

  constructor(private http: HttpClient) {
    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.token = currentUser && currentUser.token;

    // Jos token on jo sessionStoragessa, otetaan sieltä muistiin id tieto
    const currentId = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.id = currentId && currentId.id;
  }
  /* login-metodi ottaa yhteyden backendin autentikaatioreittiin, postaa tunnarit
  ja palauttaa Observablena true tai false riippuen siitä saatiinko lähetetyillä
  tunnareilla token backendistä */
  login(username: string, password: string): Observable<boolean> {
    // tässä ei käytetä JSON.stringify -metodia lähtevälle tiedolle
    return this.http
      .post(this.apiUrllogin, { username: username, password: password })
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
              this.id = payload.id;
              console.log(payload.id);
              // Tässä voidaan tarkistaa tokenin oikeellisuus
              if (payload.username === username && payload.isadmin === true) {
                // token sessionStorageen
                sessionStorage.setItem(
                  'accesstoken',
                  JSON.stringify({ username: username, adminlogin: true, token: token })
                );
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

  rekisterointiOnnistui(): Observable<any> {
    this.subject.next(3);
    return this.subject.asObservable();
  }

  // Rekisteröidään uusi käyttäjä. Admin käyttäjiä ei pysty tekemään nettisivun kautta
  rekisteroidy(username: string, password: string): Observable<boolean> {
    return this.http
    .post(this.apiUrlrekisteroidy, { username: username, password: password, isadmin: false })
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
            if (payload.username === username && payload.isadmin === false) {
              // token sessionStorageen
              sessionStorage.setItem(
                'accesstoken',
                JSON.stringify({ username: username, adminlogin: false, token: token })
              );
              console.log('käyttäjä kirjautuminen onnistui');
              this.rekisterointiOnnistui();
              return true; // saatiin token
            } else {
              console.log('login epäonnistui');
              return false; // ei saatu tokenia
            }
          } catch (err) {
            return false;
          }
        } else {
          console.log('rekisteröinti onnistui');
          return false;
        }
      })
    );
  }

  // Rekisteröidään uusi käyttäjä. Admin käyttäjiä ei pysty tekemään nettisivun kautta
  vaihdaSalana(password: string): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    console.log(this.id);
    const url = `${this.apiUrlsalasanvaihto}${this.id}`;
    console.log(url);

    return this.http
      .put(url, { password: password }, tokenheaders)
      .pipe(
        map((res) => {
          console.log(res);
          console.log('Salasanan vaihto onnistui');
          return false;
        })
      );
  } 

  poistaTunnus(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    console.log(this.id);
    const url = `${this.apiUrltunnuspoisto}${this.id}`;
    console.log(url);

    return this.http
      .delete(url, tokenheaders)
      .pipe(
        map((res) => {
          console.log(res);
          console.log('Poisto onnistui');
          return false;
        })
      );
  }
}
