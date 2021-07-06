import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RautatieAsemat } from './rautatieAsemat'; // Tuodaan rautatieasemien tieto
import { RautatieAsemaAikataulu } from './rautatieasemaAikataulu';
import { environment } from 'src/environments/environment'; // Tuodaan enviromentista url osoitteet


@Injectable({
  providedIn: 'root'
})
export class JunaAsemaService {
  private apiUrl = environment.apiUrlEnv + '/asemat'; // Asemien pää url
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

  // Hae kaikki rautatieasemat
  haeAsemat(): Observable<RautatieAsemat[]> {
    return this.http
      .get<RautatieAsemat[]>(`${this.apiUrl}/`)
      .pipe(catchError(this.handleError));
  }

  // Yksittäisen rautatieaseman haku id:llä
  haeAsema(id: string): Observable<RautatieAsemat> {
    return this.http
      .get<RautatieAsemat>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Yksittäisen rautatieaseman haku lyhytkoodilla
  haeAsemaLyhytKoodi(stationShortCode: string) {
    return this.http
    .get(`${this.apiUrl}/shortcode/${stationShortCode}`)
    .pipe(catchError(this.handleError));
  }

  /* 
    Haetaan tietynaseman aikataulu haluttujen tietojen perusteella
      station = Minkäaseman tiedot palautetaan
      arrived_trains = Kuinka monta saapunutta junaa palautetaan maksimissaan.
      arriving_trains = Kuinka monta saapuvaa junaa palautetaan maksimissaan.
      departed_trains = Kuinka monta lähtenyttä junaa palautetaan maksimissaan.
      departing_trains = Kuinka monta lähtevää junaa palautetaan maksimissaan.
  */
  haeAsemanAikataulu(station: string, arrived_trains: number, arriving_trains:number, departed_trains: number, departing_trains: number): Observable<RautatieAsemaAikataulu> {
    return this.http
      .get<RautatieAsemaAikataulu>(`${this.apiUrl}/aikataulu/${station}/${arrived_trains}/${arriving_trains}/${departed_trains}/${departing_trains}`)
      .pipe(catchError(this.handleError));
  }

  // Lisätään rautatieasemat 
  lisaaAsemat(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.apiUrl}/lisaaasemat`;
    //console.log(url);

    return this.http
      .get(url, tokenheaders)
      .pipe(
        map((res) => {
          //console.log(res);
          console.log('Rautatieasemat lisätty');
          return false;
        })
      );
  }

  // Poistetaan rautatieasemat
  poistaAsemat(): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };

    const url = `${this.apiUrl}/poistaasemat`;
    //console.log(url);

    return this.http
      .delete(url, tokenheaders)
      .pipe(
        map((res) => {
          //console.log(res);
          console.log('Rautatieasemat poistettu');
          return false;
        })
      );
  }
}
