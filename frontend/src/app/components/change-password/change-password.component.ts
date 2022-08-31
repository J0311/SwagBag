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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const formValues = this.changePasswordForm.value;
    if (formValues.newPassword.length < 6) {
      alert('wrong length');
      return;
    }
    this.authService.changePassword(formValues).subscribe(
      (formValuesReturned) => console.log(formValuesReturned, 'Form returned'),
      (err) => console.log(err),
      () => this.router.navigate(['login'])
    );
  }
}
