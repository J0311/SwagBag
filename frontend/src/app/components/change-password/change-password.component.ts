import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangePasswordService } from '../../services/change-password.service';

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
  constructor(
    private authService: ChangePasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const formValues = this.changePasswordForm.value;
    if (
      formValues.oldPassword.length === 0 ||
      formValues.newPassword.length === 0 ||
      formValues.confirmPassword.length === 0
    ) {
      this.message = 'Please fill in all fields';
      return;
    }

    if (formValues.newPassword.length < 6) {
      this.message = 'The password is too short';
      return;
    }

    if (formValues.newPassword !== formValues.confirmPassword) {
      this.message = 'The new password does not match confirm password';
      return;
    }

    this.authService.changePassword(formValues).subscribe(
      () => {
        console.log('Password changed successfully!');
        sessionStorage.clear();
        this.router.navigate(['/login']);
      },
      (err) => (this.message = err.error)
    );
  }
}
