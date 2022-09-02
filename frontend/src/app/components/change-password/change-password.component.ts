import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  message: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const formValues = this.changePasswordForm.value;
    if (formValues.newPassword.length < 6) {
      this.message = 'The password is too short';
      return;
    }
    if(formValues.newPassword !== formValues.confirmPassword){
      this.message = 'The new password does not match';
      return;
    }

    this.authService.changePassword(formValues).subscribe(
      (formValuesReturned) => console.log(formValuesReturned, 'Form returned'),
      (err) => this.message = err.error,
      () => this.router.navigate(['login'])
    );
  }
}
