import { Component } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  leftWelcome: boolean = false;
  doesUserHaveAccount: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  hasAccount(bool: boolean) {
    this.leftWelcome = true;
    const container = document.querySelector('.container');

    setTimeout(() => {
      this.doesUserHaveAccount = bool;
    }, 125);

    setTimeout(() => {
      container.classList.toggle('switch');
    }, 300);
  }

  containerHeight() {
    const container = document.querySelector('.container');

    container.classList.toggle('switch');
  }

  onLogin() {
    this.router.navigate(['user'], { relativeTo: this.route });
  }
}
