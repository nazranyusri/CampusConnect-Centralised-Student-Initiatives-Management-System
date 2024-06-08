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

  getAllSurvey(){
    return this.http.get(this.apiUrl);
  }

  getSurveyById(surveyId: number){
    return this.http.get(`${this.apiUrl}/${surveyId}`);
  }

  getSurveyHistory(userId: number){
    return this.http.get(`${this.apiUrl}/history/${userId}`, { headers: this.headers });
  }
}
