import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Registrant } from '../interface/registrant';
import { Observable } from 'rxjs';

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
    console.log("addProgram called");
    return this.http.post(`${this.apiUrl}/add`, data, { headers: this.headers });
  }

  updateProgram(data: any){
    return this.http.patch(`${this.apiUrl}/update`, data, { headers: this.headers });
  }

  deleteProgram(id: number, imagePath: string){
    console.log("deleteProgram imagePath:", imagePath);
    return this.http.delete(`${this.apiUrl}/delete/${id}/${imagePath}`, { headers: this.headers });
  }

  registerProgram(data: any) {
    console.log("registerProgram called");
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getRegistrantList(programId: number): Observable<Registrant[]> {
    return this.http.get<Registrant[]>(`${this.apiUrl}/registrant/${programId}`, { headers: this.headers });
  }

  getProgramHistory(username: string){
    return this.http.get(`${this.apiUrl}/history/${username}`, { headers: this.headers });
  }

  getUserRegisteredPrograms(userId: number){
    return this.http.get(`${this.apiUrl}/registered/${userId}`, { headers: this.headers });
  }
}
