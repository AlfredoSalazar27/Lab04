import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private apiUrl ='https://rickandmortyapi.com/api/character';
 
  constructor(private http: HttpClient) {}
 
  getPersonajes(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url);
  }
 
 
 
}
