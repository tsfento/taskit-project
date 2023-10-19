import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { TasksService } from "./tasks.service";

declare var window;

@Injectable({
  providedIn: 'root',
})
export class ToastService implements OnInit, OnDestroy {
  taskTitle: string;
  actionTaken: string;
  tasksSub: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksSub = this.tasksService.tasksChanged.subscribe((payload) => {
      // this.showToast(payload.task.title, payload.action);
    })
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }

  showToast(task: string, action: string) {
    this.taskTitle = task;
    this.actionTaken = action;

    const toastContent = document.querySelector('.toast');

    const toast = new window.bootstrap.Toast(toastContent, {delay: 2000});

    toast.show();
    console.log('toast muhfucka');
  }
}