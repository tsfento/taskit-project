import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

declare var window;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit, OnChanges {
  @Output() sendTask = new EventEmitter<Task>();

  @Input() toShowNew: boolean;
  newTaskModal;

  ngOnInit() {
    this.newTaskModal = new window.bootstrap.Modal(document.getElementById('newTaskModal'));
    // this.newTaskModal.show();
  }

  ngOnChanges(toShowNew) {
    if (toShowNew) {
      this.newTaskModal.show();
    }
  }

  addTask() {
    const form: HTMLFormElement = document.querySelector('#taskForm');
    const taskName: HTMLInputElement = document.querySelector('#inputTaskName');
    const taskDetails: HTMLInputElement = document.querySelector('#inputDetails');
    const taskDueDate: HTMLInputElement = document.querySelector('#inputDueDate');
    const taskPriority: HTMLInputElement = document.querySelector('#inputPriority');
    const taskStatus: HTMLInputElement = document.querySelector('#inputStatus');

    const task: Task = new Task(Date.now(), taskName.value, taskDetails.value, taskDueDate.value, taskPriority.value, taskStatus.value);

    form.reset();

    this.sendTask.emit(task);
  }

  resetForm() {
    const form: HTMLFormElement = document.querySelector('#taskForm');
    form.reset();
  }
}