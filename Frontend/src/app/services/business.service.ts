import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = `${environment.apiUrl}/business`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  constructor(private http: HttpClient) {}

  getAllBusiness(){
    return this.http.get(this.apiUrl);
  }

  getBusinessById(businessId: number){
    return this.http.get(`${this.apiUrl}/${businessId}`);
  }

  addBusiness(data: any){
    return this.http.post(`${this.apiUrl}/add`, data, { headers: this.headers });
  }

  updateBusiness(data: any){
    return this.http.patch(`${this.apiUrl}/update`, data, { headers: this.headers });
  }
  
  getBusinessHistory(userId: number){
    return this.http.get(`${this.apiUrl}/history/${userId}`, { headers: this.headers });
  }
}
