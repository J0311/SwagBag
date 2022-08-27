import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {observable, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    const payload = {email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    });
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  resetPassword(form: { email: string, password: string }): Observable<any> {
    alert(`Password Changed! Success!
    Email: ${form.email}
    Password: ${form.password}
    `)
    return of(form)
    // return this.http.post<any>(`${this.authUrl}/reset-password`, form, {headers: environment.headers})
  }

  changePassword(form: { oldPassword: string, newPassword: string }): Observable<any> {
    alert(`Password Changed! Success!
    Email: ${form.oldPassword}
    Password: ${form.newPassword}
    `)
    return of(form)
    // return this.http.post<any>(`${this.authUrl}/change-password`, form, {headers: environment.headers})
  }
}
