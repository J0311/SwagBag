import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  getLoggedInUser(): any {
    return sessionStorage.getItem('loggedInUser')
      ? JSON.parse(sessionStorage.getItem('loggedInUser') || '')
      : null;
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email: email, password: password };
    const res = this.http.post<any>(`${this.authUrl}/login`, payload, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
    res.subscribe((data) => {
      sessionStorage.setItem(
        'loggedInUser',
        JSON.stringify({ id: data.id, name: data.firstName, role: data.role })
      );

      this.router.navigate(['/home']);
    });

    return res;
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null);
    sessionStorage.removeItem('loggedInUser');
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {
      headers: environment.headers,
    });
  }

  // changePassword(form: {
  //   oldPassword: string;
  //   newPassword: string;
  // }): Observable<any> {
  //   alert(`Password Changed! Success!
  //   Email: ${form.oldPassword}
  //   Password: ${form.newPassword}
  //   `);
  //   return of(form);
  //   // return this.http.post<any>(`${this.authUrl}/change-password`, form, {headers: environment.headers})
  // }

  changePassword(form: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<any> {
      /*alert(`Password Changed! Success!
        Email: ${form.oldPassword}
        Password: ${form.newPassword}
        `);*/
      //return of(form);
      const payload = {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      };
      // return this.http.post<any>(
      //   `${this.authUrl}/api/user/change-password`,
      return this.http.patch<any>(
        `${environment.baseUrl}/api/user/change-password`,
        payload,
        {
          headers: environment.headers,
          withCredentials: environment.withCredentials,
        }
      );

    //return this.http.post<any>(`${this.authUrl}/change-password`, form, {headers: environment.headers})
  }
}
