import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = `${environment.apiUrl}/program`;

  constructor(private http: HttpClient) {}

  getAllProgram(){
    return this.http.get(this.apiUrl);
  }

  getProgramById(id: number){
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
