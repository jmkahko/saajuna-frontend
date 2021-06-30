import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SaaEnnuste } from './saaennuste';
import { SaaNyt } from './saanyt';

@Injectable({
  providedIn: 'root',
})
export class SaaService {
  //private apiUrl = 'http://localhost:3000/saaasemat'; // Havaintoasemien pää url
  private apiUrl = 'https://saajuna-backend.herokuapp.com/saaasemat'; // Havaintoasemien pää url
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

  haeSaaNyt(fmisid: number): Observable<SaaNyt[]> {
    return this.http
      .get<SaaNyt[]>(`${this.apiUrl}/saanyt/${fmisid}`)
      .pipe(catchError(this.handleError));
  }

  haeSaaEnnuste(latlon: string): Observable<SaaEnnuste[]> {
    return this.http
      .get<SaaEnnuste[]>(`${this.apiUrl}/saaennuste/latlon/${latlon}`)
      .pipe(catchError(this.handleError));
  }
}
