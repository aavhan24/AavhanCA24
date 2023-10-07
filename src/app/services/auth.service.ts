import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs'; // Add this import statement
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:boolean=false;

  private jwtHelper: JwtHelperService = new JwtHelperService();
  private backendUrl = 'http://pukar.aavhan.org'; // Replace with your backend URL

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> { // Expect two arguments
    const credentials = { email, password };

    return this.http.post(`${this.backendUrl}/student/login`, credentials)
      .pipe(
        tap((resultData: any) => {
          if (resultData.status) {
            localStorage.setItem('token', resultData.token);
            
          }
        })
      );
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }


  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    console.log(headers);
    return this.http.get(`${this.backendUrl}/getUserDetails`, { headers: headers });
  }
  

  logout(): void {
    localStorage.removeItem('token');
  }
}



