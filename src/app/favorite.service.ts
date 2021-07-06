import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Favorite } from './favorite';
import { environment } from 'src/environments/environment'; // Tuodaan enviromentista url osoitteet

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = environment.apiUrlEnv + '/favorites'; // Pää user url
  public username: string;
  public token: string;
  public favoriteid: string
  private id: string;

  // Suosikit taulukko
  favoritelist: Array<Favorite> = [];

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

  // Haetaan kaikkien käyttäjien suosikit
  haeKaikkiSuosikit(): Observable<Favorite[]> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };

    const url = `${this.apiUrl}`;

    return this.http
    .get<Favorite[]>(url, tokenheaders)
    .pipe(catchError(this.handleError));
  }

  // Haetaan tietyn käyttäjän suosikit
  haeSuosikit(username: string): Observable<Favorite> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };

    const url = `${this.apiUrl}/${username}`;
    //console.log(url);
    
    return this.http
      .get<Favorite>(url, tokenheaders)
      .pipe(catchError(this.handleError));
  }

  // Päivitetään käyttäjän suosikkeja
  paivitaSuosikit(favoriteid: string, favoritesSaa1:string, favoritesSaa2: string, favoritesJuna1:number, favoritesJuna2: number): Observable<Favorite> {
      // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
      const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

      // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
      const tokenheaders = {
        headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
      };

      const url = `${this.apiUrl}/${favoriteid}`;
      return this.http
        .put(url, {favoritesSaa1: favoritesSaa1, favoritesSaa2: favoritesSaa2, favoritesJuna1: favoritesJuna1, favoritesJuna2: favoritesJuna2}, tokenheaders)
        .pipe(catchError(this.handleError))
  }

  // Lisätään käyttäjälle suosikit
  lisaaSuosikit(tunnus:string, favoritesSaa1:string, favoritesSaa2: string, favoritesJuna1:number, favoritesJuna2: number) {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));

    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };

    const url = `${this.apiUrl}`;

    return this.http
      .post<Favorite>(url, {username: tunnus,favoritesSaa1: favoritesSaa1, favoritesSaa2: favoritesSaa2, favoritesJuna1: favoritesJuna1, favoritesJuna2: favoritesJuna2}, tokenheaders)
      .pipe(catchError(this.handleError))
  }

  // Käyttäjätunnuksen poisto
  poistaSuosikkiTunnus(favoriteid: string): Observable<any> {
    // Otetaan token tieto käyttäjätunnuksen poistosanoman mukaan
    const mytoken = JSON.parse(sessionStorage.getItem('accesstoken'));
  
    // Asetaan muuttujaan headers tieto, jossa kerrotaan token tieto
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.apiUrl}/deletefavorite/${favoriteid}`;
    //console.log(url);
  
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