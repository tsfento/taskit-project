import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { Subscription } from 'rxjs';
import { Task } from '../shared/task.model';

declare var window;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  taskTitle: string;
  actionTaken: string;
  tasksSub: Subscription

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksSub = this.tasksService.tasksChanged.subscribe((payload) => {
      this.showToast(payload.task.title, payload.action);
    });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }

  showToast(task: string, action: string) {
    this.taskTitle = task;
    this.actionTaken = action;

    const toastContent = document.querySelector('.toast');

    toastContent.classList.remove('red', 'green');

    if (action === 'deleted') {
      toastContent.classList.add('red');
    } else {
      toastContent.classList.add('green');
    }

    const toast = new window.bootstrap.Toast(toastContent, {delay: 2000});

    toast.show();
  }
}
