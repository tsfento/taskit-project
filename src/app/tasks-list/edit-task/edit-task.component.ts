import { Component } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from 'src/app/shared/tasks.service';

declare var window;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  constructor(private tasksService: TasksService) {}

  editTask() {
    this.tasksService.showTaskModal('editTaskModal');
  }

  resetForm() {
    this.tasksService.resetForm('#editTaskForm');
  }

  saveChanges() {
    const editForm: HTMLFormElement = document.querySelector('#editTaskForm');
    const taskEditName: HTMLInputElement = document.querySelector('#inputEditTaskName');
    const taskEditDetails: HTMLInputElement = document.querySelector('#inputEditDetails');
    const taskEditDueDate: HTMLInputElement = document.querySelector('#inputEditDueDate');
    const taskEditPriority: HTMLInputElement = document.querySelector('#inputEditPriority');
    const taskEditStatus: HTMLInputElement = document.querySelector('#inputEditStatus');

    const editedTask: Task = new Task(0, 'pass original id' + taskEditName.value, taskEditDetails.value, taskEditDueDate.value, taskEditPriority.value, taskEditStatus.value);

    editForm.reset();

    this.tasksService.editTask(editedTask);
  }
}