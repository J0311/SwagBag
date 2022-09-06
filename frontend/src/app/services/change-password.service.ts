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
