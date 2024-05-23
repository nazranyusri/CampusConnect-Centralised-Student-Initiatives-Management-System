import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(GlobalConstants.usernameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required, Validators.pattern(GlobalConstants.passwordRegex)]]
    });
  }

  register() {
    this.ngxService.start();
    var formData = this.registerForm.value;
    var data = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
    console.log(data);

    // this.userService.register(data).subscribe((response: any) => {
    //   this.ngxService.stop();
    //   localStorage.setItem('token', response.token);
    //   this.router.navigate(['/homepage']);
    // }, (error) => {
    //   console.log(error);
    //   this.ngxService.stop();
    //   if (error.error?.message) {
    //     this.responseMessage = error.error?.message;
    //   }
    //   else {
    //     this.responseMessage = GlobalConstants.genericError;
    //   }
    //   this.snackbarService.openSnackBar(this.responseMessage);
    // })
  }
}