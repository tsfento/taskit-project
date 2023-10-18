import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from './shared/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  loggedInSub: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    // this.loggedInSub = this.tasksService.loggedIn.subscribe(bool => {
    //   this.loggedIn = bool;
    // });
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
