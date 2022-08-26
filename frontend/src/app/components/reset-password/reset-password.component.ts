import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPasswordForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService) {
  }


  /**
   * Runs when the submit button is clicked!
   */
  onSubmit(): void {
    const formValues = this.resetPasswordForm.value;
    // const fEmail = formValues.email;
    // const fPassword = formValues.password;
    // const {email, password} = this.resetPasswordForm.value;
    this.authService.resetPassword(formValues).subscribe((formValuesReturned) => {
      console.log(formValuesReturned, 'Form returned')
    })
  }

}
