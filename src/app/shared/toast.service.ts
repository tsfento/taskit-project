import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "./task.model";

declare var window;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  taskTitle: string;
  actionTaken: string;


  showToast(task: Task, action: string) {
    this.taskTitle = task.title;
    this.actionTaken = action;

    const toastContent = document.querySelector('.toast');

    const toast = new window.bootstrap.Toast(toastContent, {delay: 2000});

    toast.show();
  }
}