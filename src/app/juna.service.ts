import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Juna } from './juna';

@Injectable({
  providedIn: 'root'
})
export class JunaService {
  //private apiUrl = 'http://localhost:3000/junat'; // Asemien pää url
  private apiUrl = 'https://saajuna-backend.herokuapp.com/junat'; // Asemien pää url
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

  // Hae tietyn junan aikataulu
  haeAikataulu(date: string, train: number): Observable<Juna[]> {
    return this.http
    .get<Juna[]>(`${this.apiUrl}/aikataulu/${date}/${train}`)
    .pipe(catchError(this.handleError));
  }

  // Hae tietyn junan paikkatieto
  haePaikkatieto(date: string, train: number) {
    return this.http
    .get(`${this.apiUrl}/paikkatieto/${date}/${train}`)
    .pipe(catchError(this.handleError));
  }

}
