import { Component } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from 'src/app/shared/tasks.service';

declare var window;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})

export class NewTaskComponent {
  constructor(private tasksService: TasksService) {}

  newTask() {
    const newForm: HTMLFormElement = document.querySelector('#newTaskForm');
    const taskNewName: HTMLInputElement = document.querySelector('#inputNewTaskName');
    const taskNewDetails: HTMLInputElement = document.querySelector('#inputNewDetails');
    const taskNewDueDate: HTMLInputElement = document.querySelector('#inputNewDueDate');
    const taskNewPriority: HTMLSelectElement = document.querySelector('#inputNewPriority');
    const taskNewStatus: HTMLSelectElement = document.querySelector('#inputNewStatus');

    const task: Task = new Task(Date.now(), taskNewName.value, taskNewDetails.value, taskNewDueDate.value, taskNewPriority.value, taskNewStatus.value, taskNewDueDate.value);

    task.dueDate = this.tasksService.formatDate(task.dueDate);

    newForm.reset();

    this.tasksService.addTask(task);
  }

  resetForm() {
    this.tasksService.resetForm('#newTaskForm');
  }
}