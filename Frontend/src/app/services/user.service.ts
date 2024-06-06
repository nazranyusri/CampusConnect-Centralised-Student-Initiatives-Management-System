import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  
  constructor(private http: HttpClient) { }

  authenticate(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap(() => {
        this.loggedIn.next(true); // Set to true on successful login
      }),
      catchError(error => {
        this.loggedIn.next(false); // Ensure it's false on failure
        return throwError(error);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${userId}`, { headers: this.headers });
  }
}
