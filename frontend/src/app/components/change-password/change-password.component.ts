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
  /**
   * @remarks change password form and message are from the html
   */
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

  /**
   *
   * @returns this function doesnt return anything.
   *
   * Subsribes to an auth service stream. If auth return error the message, changes to reflect the exact error.
   * Else it redirects to login after the password is changed.
   *
   * first if checks if field is inputed.
   *
   * Second if checks the length of the inputed field.
   *
   * Third if checks if passwords match.
   */
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
