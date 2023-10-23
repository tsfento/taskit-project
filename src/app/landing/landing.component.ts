import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });

    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
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
      } else {
        signupDiv.removeAttribute('hidden');
        loginDiv.setAttribute('hidden', '');
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
