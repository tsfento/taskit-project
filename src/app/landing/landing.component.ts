import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private router: Router, private route: ActivatedRoute) {}

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

  onSignupSubmit() {
    this.router.navigate(['user'], { relativeTo: this.route });
  }

  onLoginSubmit() {
    this.router.navigate(['user'], { relativeTo: this.route });
  }
}
