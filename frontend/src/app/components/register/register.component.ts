import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    adminChecked: new FormControl(false),
    accessCode: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // validate all fields
    if (
      this.registerForm.value.fname === '' ||
      this.registerForm.value.lname === '' ||
      this.registerForm.value.email === '' ||
      this.registerForm.value.password === ''
    ) {
      alert('Please fill out all fields');
      return;
    }

    if (
      this.registerForm.value.adminChecked &&
      this.registerForm.value.accessCode !== environment.accessCode
    ) {
      alert('Access code is invalid');
      return;
    }

    this.authService
      .register(
        this.registerForm.get('fname')?.value,
        this.registerForm.get('lname')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value,
        this.registerForm.get('adminChecked')?.value ? 'ADMIN' : 'CUSTOMER'
      )
      .subscribe(
        () => console.log('New user registered'),
        (err) => console.log(err),
        () => this.router.navigate(['login'])
      );
  }
}
