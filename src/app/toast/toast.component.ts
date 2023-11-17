import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';

declare var window;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  taskTitle: string;
  actionTaken: string;
  tasksSub: Subscription;
  userSub: Subscription;
  isSignUpOrLogin: boolean = false;
  userMessage: string;

  constructor(private storageService: StorageService, private authService: AuthService) {}

  ngOnInit() {
    this.tasksSub = this.storageService.tasksChanged.subscribe(toastData => {
      this.showTaskToast(toastData.task.title, toastData.action);
    });

    this.userSub = this.authService.userToast.subscribe(message => {
      this.showUserToast(message);
    });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  showTaskToast(task: string, action: string) {
    this.isSignUpOrLogin = false;

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

  showUserToast(message: string) {
    this.isSignUpOrLogin = true;

    this.userMessage = message;

    const toastContent = document.querySelector('.toast');

    toastContent.classList.remove('red', 'green');

    toastContent.classList.add('green');

    const toast = new window.bootstrap.Toast(toastContent, {delay: 2000});

    toast.show();
  }
}
