import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = `${environment.apiUrl}/survey`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  constructor(private http: HttpClient) {}

  getSurveyHistory(userId: number){
    return this.http.get(`${this.apiUrl}/history/${userId}`, { headers: this.headers });
  }
}
