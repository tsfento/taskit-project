import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from 'src/app/shared/tasks.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  taskIndex: number;
  isEditing: boolean;
  tasksSub: Subscription;
  editingSub: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;
    });

    this.editingSub = this.tasksService.isEditing.subscribe(
      (bool: boolean) => {
        this.isEditing = bool;
        console.log(this.isEditing);
      });
  }

  ngOnDestroy() {
    this.editingSub.unsubscribe();
  }

  newTask() {
    const taskNewName: HTMLInputElement = document.querySelector('#inputTaskName');
    const taskNewDetails: HTMLInputElement = document.querySelector('#inputDetails');
    const taskNewDueDate: HTMLInputElement = document.querySelector('#inputDueDate');
    const taskNewPriority: HTMLSelectElement = document.querySelector('#inputPriority');
    const taskNewStatus: HTMLSelectElement = document.querySelector('#inputStatus');
    const splitPriority = taskNewPriority.value.split('-');
    const splitStatus = taskNewStatus.value.split('-');

    const task: Task = new Task(Date.now(), taskNewName.value, taskNewDetails.value, taskNewDueDate.value, splitPriority[0], splitStatus[0], taskNewDueDate.value, +splitPriority[1], +splitStatus[1]);

    task.dueDate = this.tasksService.formatDate(task.dueDate);

    this.resetForm();

    taskNewDueDate.value = this.getTodaysDate();

    this.tasksService.addTask(task);
  }

  saveChanges() {
    this.tasks = this.tasksService.tasks;
    this.taskIndex = this.tasksService.taskIndex;
    const taskEditName: HTMLInputElement = document.querySelector('#inputTaskName');
    const taskEditDetails: HTMLInputElement = document.querySelector('#inputDetails');
    const taskEditDueDate: HTMLInputElement = document.querySelector('#inputDueDate');
    const taskEditPriority: HTMLSelectElement = document.querySelector('#inputPriority');
    const taskEditStatus: HTMLSelectElement = document.querySelector('#inputStatus');
    const splitPriority = taskEditPriority.value.split('-');
    const splitStatus = taskEditStatus.value.split('-');

    const editedTask: Task = new Task(this.tasks[this.taskIndex].id, taskEditName.value, taskEditDetails.value, taskEditDueDate.value, splitPriority[0], splitStatus[0], taskEditDueDate.value, +splitPriority[1], +splitStatus[1]);

    editedTask.dueDate = this.tasksService.formatDate(editedTask.dueDate);

    this.resetForm();

    this.tasksService.editTask(editedTask, this.taskIndex);
  }

  resetForm() {
    const taskNewDueDate: HTMLInputElement = document.querySelector('#inputDueDate');
    this.tasksService.resetForm('#taskForm');
    taskNewDueDate.value = this.getTodaysDate();
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