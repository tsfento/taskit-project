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
  task: Task = new Task('','','','');

  @Input() toShow: boolean;
  newTaskModal;

  ngOnInit() {
    this.newTaskModal = new window.bootstrap.Modal(document.getElementById('newTaskModal'));
    this.newTaskModal.show();
  }

  ngOnChanges(toShow) {
    if (toShow) {
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

    this.task.title = taskName.value;
    this.task.dueDate = taskDueDate.value;
    this.task.priority = taskPriority.value;
    this.task.status = taskStatus.value;

    form.reset();
  }
}