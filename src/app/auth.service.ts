import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; // kirjasto jwt:n käsittelyyn
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Kayttaja } from './kayttaja';
import { environment } from 'src/environments/environment'; // Tuodaan enviromentista url osoitteet
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrlEnv + '/users'; // Pää user url
  public token: string;
  private jwtHelp = new JwtHelperService(); // helpperipalvelu jolla dekoodataan token
  private subject = new Subject<any>(); // subjectilla viesti navbariin että token on tullut
  private id: string;
  public username: string;
  public rekisterointi: boolean; // Rekisteröinti onnistui

  constructor(
    private http: HttpClient,
    private router: Router) {
    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.token = currentUser && currentUser.token;

    // Jos token on jo sessionStoragessa, otetaan sieltä muistiin id tieto
    const currentId = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.id = currentId && currentId.id;
  }

  // Haetaan kaikki käyttäjät
  haeKaikkiKayttajat(): Observable<Kayttaja[]> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };

    return this.http
      .get<Kayttaja[]>(`${this.apiUrl}/`, tokenheaders)
  }


  /* login-metodi ottaa yhteyden backendin autentikaatioreittiin, postaa tunnarit
  ja palauttaa Observablena true tai false riippuen siitä saatiinko lähetetyillä
  tunnareilla token backendistä */
  login(username: string, password: string): Observable<boolean> {
    // tässä ei käytetä JSON.stringify -metodia lähtevälle tiedolle
    return this.http
      .post(`${this.apiUrl}/login/`, { username: username, password: password })
      .pipe(
        map((res) => {
          //console.log(res); // loggaa alla olevan tyylisen vastauksen
          const token = res['token']; // otetaan vastauksesta token
          if (token) {
            this.token = token;
            /* Tässä tutkitaan onko tokenin payloadin sisältö oikea.
             Jos on, laitetaan token sessionStorageen ja palautetaan true
             jolloin käyttäjä pääsee sivustolle
          */
            try {
              // dekoodataan token
              const payload = this.jwtHelp.decodeToken(token);
              this.id = payload.id;
              //console.log(payload.id);
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
                // token sessionStorageen. Käyttäjätunnus, adminlogin on false, käyttäjän id ja token tieto
                sessionStorage.setItem(
                  'accesstoken',
                  JSON.stringify({ username: username, adminlogin: false, id: this.id, token: token })
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

  // Ilmoitetaan jos rekisteröinti onnistui
  rekisterointiOnnistui(): Observable<any> {
    this.subject.next(true);
    return this.subject.asObservable();
  }

  // Rekisteröidään uusi käyttäjä. Admin käyttäjiä ei pysty tekemään nettisivun kautta
  rekisteroidy(username: string, password: string): Observable<boolean> {
    return this.http
    .post(`${this.apiUrl}/register/`, { username: username, password: password, isadmin: false })
    .pipe(
      map((res) => {
        //console.log(res); // loggaa alla olevan tyylisen vastauksen
        const token = res['token']; // otetaan vastauksesta token
        if (token) {
          this.token = token;
          /* Tässä tutkitaan onko tokenin payloadin sisältö oikea.
           Jos on, laitetaan token sessionStorageen ja palautetaan true
           jolloin käyttäjä pääsee sivulle
        */
          try {
            // dekoodataan token
            const payload = this.jwtHelp.decodeToken(token);
            //console.log(payload);
            // Tässä voidaan tarkistaa tokenin oikeellisuus
            if (payload.username === username && payload.isadmin === false) {
              // token sessionStorageen
              sessionStorage.setItem(
                'accesstoken',
                JSON.stringify({ username: username, adminlogin: false, token: token })
              );
              this.rekisterointi = true;
              console.log('käyttäjä rekisteröinti onnistui');
              this.router.navigate(['/rekirjaus']);
              return true; // saatiin token
            } else {
              console.log('rekisteröinti epäonnistui');
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

  // Käyttäjän salasanan vaihto
  vaihdaSalana(password: string): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin käyttäjän id tieto
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.id = currentUser && currentUser.id;

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };

    //console.log(this.id);
    const url = `${this.apiUrl}/changepassword/${this.id}`;
    //console.log(url);

    return this.http
      .put(url, { password: password }, tokenheaders)
      .pipe(
        map((res) => {
          //console.log(res); // loggaa alla olevan tyylisen vastauksen
        const token = res['token']; // otetaan vastauksesta token
        if (token) {
          this.token = token;
          /* Tässä tutkitaan onko tokenin payloadin sisältö oikea.
           Jos on, laitetaan token sessionStorageen ja palautetaan true
           jolloin käyttäjä pääsee sivulle
        */
          try {
            // dekoodataan token
            const payload = this.jwtHelp.decodeToken(token);
            //console.log(payload);
            // Tässä voidaan tarkistaa tokenin oikeellisuus
            if (payload.username === this.username && payload.isadmin === false) {
              // token sessionStorageen
              sessionStorage.setItem(
                'accesstoken',
                JSON.stringify({ username: this.username, adminlogin: false, token: token })
              );
              this.router.navigate(['/omatsivut']);
              return true; // saatiin token
            } else {
              console.log('salasanan vaihto epäonnistui');
              return false; // ei saatu tokenia
            }
          } catch (err) {
            return false;
          }
        } else {
          console.log('salana vaihdettu');
          return false;
        }
        })
      );
  } 

  // Käyttäjätunnuksen poisto Omat tiedot -sivujen kautta
  poistaTunnus(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin käyttäjän id tieto
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.id = currentUser && currentUser.id;

    //console.log(this.id)

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    //console.log(this.id);
    const url = `${this.apiUrl}/deleteuser/${this.id}`;
    //console.log(url);

    return this.http
      .delete(url, tokenheaders)
      .pipe(
        map((res) => {
          console.log(res);
          this.router.navigate(['/etusivu']);
          console.log('Poisto onnistui');
          return false;
        })
      );
  }

  // Käyttäjätunnuksen poisto Admin -sivun kautta
  poistaTunnusId(iduser: string): Observable<Kayttaja> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));
  
    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
     const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    //console.log(iduser);
    const url = `${this.apiUrl}/deleteuser/${iduser}`;
    //console.log(url);
  
    return this.http
      .delete<Kayttaja>(url, tokenheaders)
    }
}
