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
  todaysDate: string = this.getTodaysDate();

  constructor(private tasksService: TasksService) {}

  newTask() {
    const newForm: HTMLFormElement = document.querySelector('#newTaskForm');
    const taskNewName: HTMLInputElement = document.querySelector('#inputNewTaskName');
    const taskNewDetails: HTMLInputElement = document.querySelector('#inputNewDetails');
    const taskNewDueDate: HTMLInputElement = document.querySelector('#inputNewDueDate');
    const taskNewPriority: HTMLSelectElement = document.querySelector('#inputNewPriority');
    const taskNewStatus: HTMLSelectElement = document.querySelector('#inputNewStatus');
    const splitPriority = taskNewPriority.value.split('-');
    const splitStatus = taskNewStatus.value.split('-');

    const task: Task = new Task(Date.now(), taskNewName.value, taskNewDetails.value, taskNewDueDate.value, splitPriority[0], splitStatus[0], taskNewDueDate.value, +splitPriority[1], +splitStatus[1]);

    task.dueDate = this.tasksService.formatDate(task.dueDate);

    newForm.reset();

    taskNewDueDate.value = this.todaysDate;

    this.tasksService.addTask(task);
  }

  resetForm() {
    const taskNewDueDate: HTMLInputElement = document.querySelector('#inputNewDueDate');
    this.tasksService.resetForm('#newTaskForm');
    taskNewDueDate.value = this.todaysDate;
  }

  getTodaysDate() {
    const todaysDate: Date = new Date();
    const year: string = todaysDate.getFullYear().toString();
    let month: string = String(todaysDate.getMonth() + 1);
    let day: string = todaysDate.getDate().toString();

    if (Number(month) < 10) {
      month = '0' + month;
    }

    if (Number(day) < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }
}