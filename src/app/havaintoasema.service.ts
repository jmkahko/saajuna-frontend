import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HavaintoAsemat } from './havaintoasemat'; // Tuodaan havaintoasemien tieto
import { environment } from 'src/environments/environment'; // Tuodaan enviromentista url osoitteet

@Injectable({
  providedIn: 'root',
})
export class HavaintoasemaService {
  private apiUrl = environment.apiUrlEnv + '/saaasemat'; // Havaintoasemien pää url
  public token: string;
  log: any;

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

  // Hae kaikki säähavaintoasemat
  haeHavaintoAsemat(): Observable<HavaintoAsemat[]> {
    return this.http
      .get<HavaintoAsemat[]>(`${this.apiUrl}/`)
      .pipe(catchError(this.handleError));
  }

  // Haetaan tietty säähavaintoasema
  haeHavaintoAsema(id: string): Observable<HavaintoAsemat> {
    return this.http
      .get<HavaintoAsemat>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Haetaan tietyn säähavaintoaseman säätiedot, jos viimeisestä hausta on kulunyt yli 10 minuuttia
  haeHavaintoAsema10Min(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.apiUrl}/saanyt/:fmisid`;
    //console.log(url);

    return this.http.get(url, tokenheaders).pipe(
      map((res) => {
        console.log(res);
        console.log('Havaintoaseman säätiedot haettu');
        return false;
      })
    );
  }

  // Haetaan tietyn säähavaintoaseman sääennuste koordinaateilla
  haeHavaintoAsemaNimella(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.apiUrl}/saaennuste/:latlon`;
    //console.log(url);

    return this.http.get(url, tokenheaders).pipe(
      map((res) => {
        //console.log(res);
        //console.log('Koordinaattien sääennuste haettu');
        return false;
      })
    );
  }
}
