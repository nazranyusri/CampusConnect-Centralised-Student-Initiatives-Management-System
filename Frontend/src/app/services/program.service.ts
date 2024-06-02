import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = `${environment.apiUrl}/program`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  constructor(private http: HttpClient) {}

  getAllProgram(){
    return this.http.get(this.apiUrl);
  }

  getProgramById(id: number){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProgram(data: any){
    return this.http.post(`${this.apiUrl}/add`, data, { headers: this.headers });
  }
}
