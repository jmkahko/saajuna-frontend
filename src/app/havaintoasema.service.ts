import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HavaintoAsemat } from './havaintoasemat'; // Tuodaan rautatieasemien tieto

@Injectable({
  providedIn: 'root',
})
export class HavaintoasemaService {
  private apiUrl = 'http://localhost:3000/saaasemat'; // Havaintoasemien pää url
  public token: string;

  constructor(private http: HttpClient) {
    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.token = currentUser && currentUser.token;
  }

  // Virheenkäsittelymetodi joka palauttaa observablen
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  // Hae kaikki havaintoasemat
  haeHavaintoAsemat(): Observable<HavaintoAsemat[]> {
    return this.http
      .get<HavaintoAsemat[]>(`${this.apiUrl}/`)
      .pipe(catchError(this.handleError));
  }

  // Haetaan tietty havaintoasema
  haeHavaintoAsema(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.apiUrl}/:fmisid`;
    console.log(url);

    return this.http.get(url, tokenheaders).pipe(
      map((res) => {
        console.log(res);
        console.log('Havaintoasema haettu');
        return false;
      })
    );
  }
  // Haetaan tietyn havaintoaseman säätiedot 10 minuuttia
  haeHavaintoAsema10Min(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.apiUrl}/saanyt/:fmisid`;
    console.log(url);

    return this.http.get(url, tokenheaders).pipe(
      map((res) => {
        console.log(res);
        console.log('Havaintoaseman säätiedot haettu');
        return false;
      })
    );
  }
  // Haetaan tietyn havaintoaseman sääennuste paikan nimellä
  haeHavaintoAsemaNimella(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.apiUrl}/saaennuste/:place`;
    console.log(url);

    return this.http.get(url, tokenheaders).pipe(
      map((res) => {
        console.log(res);
        console.log('Havaintoaseman sääennuste haettu');
        return false;
      })
    );
  }
}