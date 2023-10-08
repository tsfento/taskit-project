import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from 'src/app/shared/tasks.service';

declare var window;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  tasks: Task[] = [];
  taskIndex: number;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
  }

  resetForm() {
    this.tasksService.resetForm('#editTaskForm');
  }

  saveChanges() {
    this.tasks = this.tasksService.tasks;
    this.taskIndex = this.tasksService.taskIndex;
    const editForm: HTMLFormElement = document.querySelector('#editTaskForm');
    const taskEditName: HTMLInputElement = document.querySelector('#inputEditTaskName');
    const taskEditDetails: HTMLInputElement = document.querySelector('#inputEditDetails');
    const taskEditDueDate: HTMLInputElement = document.querySelector('#inputEditDueDate');
    const taskEditPriority: HTMLInputElement = document.querySelector('#inputEditPriority');
    const taskEditStatus: HTMLInputElement = document.querySelector('#inputEditStatus');

    const editedTask: Task = new Task(this.tasks[this.taskIndex].id, taskEditName.value, taskEditDetails.value, taskEditDueDate.value, taskEditPriority.value, taskEditStatus.value);

    editForm.reset();

    this.tasksService.editTask(editedTask, this.taskIndex);
  }
}