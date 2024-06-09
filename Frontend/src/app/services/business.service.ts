import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = `${environment.apiUrl}/business`;
  // private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  constructor(private http: HttpClient) {}

  getAllBusiness(){
    return this.http.get(this.apiUrl);
  }

  getBusinessById(businessId: number){
    return this.http.get(`${this.apiUrl}/${businessId}`);
  }

  getTotalBusiness(){
    return this.http.get(`${this.apiUrl}/total`);
  }

  addBusiness(data: any){
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  updateBusiness(data: any){
    return this.http.patch(`${this.apiUrl}/update`, data);
  }

  deleteBusiness(id: number, imagePath: string){
    return this.http.delete(`${this.apiUrl}/delete/${id}/${imagePath}`);
  }
  
  getBusinessHistory(userId: number){
    return this.http.get(`${this.apiUrl}/history/${userId}`);
  }
}
