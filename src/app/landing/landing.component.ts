import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService, IResponseData } from '../shared/auth.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  leftWelcome: boolean = false;
  doesUserHaveAccount: boolean = false;
  signupForm: FormGroup;
  loginForm: FormGroup;
  authObservable: Observable<IResponseData>;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup ({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  hasAccount(bool: boolean) {
    this.error = null;
    const container = document.querySelector('.container');
    const signupDiv = document.querySelector('.signup-div');
    const loginDiv = document.querySelector('.login-div');

    setTimeout(() => {
      this.leftWelcome = true;
      this.doesUserHaveAccount = bool;

      if (bool === true) {
        signupDiv.setAttribute('hidden', '');
        loginDiv.removeAttribute('hidden');
        this.signupForm.reset();
        this.loginForm.reset();
      } else {
        signupDiv.removeAttribute('hidden');
        loginDiv.setAttribute('hidden', '');
        this.signupForm.reset();
        this.loginForm.reset();
      }
    }, 125);

    setTimeout(() => {
      container.classList.toggle('switch');
    }, 300);
  }

  containerHeight() {
    const container = document.querySelector('.container');
    container.classList.toggle('switch');
  }

  onSignupSubmit(form: FormGroup) {
    this.error = null;
    this.authObservable = this.authService.signUpOrLogin(form.value, false);
    this.authSub(form);
  }

  onLoginSubmit(form: FormGroup) {
    this.error = null;
    this.authObservable = this.authService.signUpOrLogin(form.value, true);
    this.authSub(form);
  }

  authSub(form: FormGroup) {
    this.authObservable.subscribe({
      next: (data: IResponseData) => {
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            this.error = 'E-mail or password incorrect.';
            break;
          case 'INVALID_LOGIN_CREDENTIALS':
            this.error = 'E-mail or password incorrect.';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            this.error = 'Too many failed login attempts. Please try again later.';
            break;
          case 'ADMIN_ONLY_OPERATION':
            this.error = 'Sign up unavailable at this time.';
            break;
          default:
            this.error = 'An error occurred. Please try again later.';
            break;
        }
      },
      complete: () => {
        form.reset();
        this.authService.navigateToUserPage();
      }
    });
  }
}
