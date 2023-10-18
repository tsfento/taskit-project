import { Component } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  doesUserHaveAccount: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  hasAccount(bool: boolean) {
    this.doesUserHaveAccount = bool;
  }

  containerHeight() {
    const container = document.querySelector('.container');

    container.classList.toggle('switched');
  }

  onLogin() {
    this.router.navigate(['user'], { relativeTo: this.route });
  }
}
