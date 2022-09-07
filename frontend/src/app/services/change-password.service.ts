import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  userUrl: string = `${environment.baseUrl}/api/user`;

  constructor(private http: HttpClient) {}

  /**
   *
   * @param form is from the change password component html, and is a form of 3 strings
   * @returns http response gathered from the userService.java
   */
  changePassword(form: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<any> {
    const payload = {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    };

    return this.http.patch<any>(`${this.userUrl}/change-password`, payload, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }
}
