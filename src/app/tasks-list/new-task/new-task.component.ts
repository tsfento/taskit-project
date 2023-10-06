import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

declare var window;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit, OnChanges {
  @Output() sendNewTask = new EventEmitter<Task>();

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
    const newForm: HTMLFormElement = document.querySelector('#newTaskForm');
    const taskNewName: HTMLInputElement = document.querySelector('#inputNewTaskName');
    const taskNewDetails: HTMLInputElement = document.querySelector('#inputNewDetails');
    const taskNewDueDate: HTMLInputElement = document.querySelector('#inputNewDueDate');
    const taskNewPriority: HTMLInputElement = document.querySelector('#inputNewPriority');
    const taskNewStatus: HTMLInputElement = document.querySelector('#inputNewStatus');

    const task: Task = new Task(Date.now(), taskNewName.value, taskNewDetails.value, taskNewDueDate.value, taskNewPriority.value, taskNewStatus.value);

    newForm.reset();

    this.sendNewTask.emit(task);
  }

  resetForm() {
    const newForm: HTMLFormElement = document.querySelector('#newTaskForm');
    newForm.reset();
  }
}