import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

declare var window;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Output() sendEditedTask = new EventEmitter<Task>();

  editTaskModal;

  ngOnInit() {
    this.editTaskModal = new window.bootstrap.Modal(document.getElementById('editTaskModal'));
  }

  editTask() {
    const editForm: HTMLFormElement = document.querySelector('#editTaskForm');
    const taskEditName: HTMLInputElement = document.querySelector('#inputEditTaskName');
    const taskEditDetails: HTMLInputElement = document.querySelector('#inputEditDetails');
    const taskEditDueDate: HTMLInputElement = document.querySelector('#inputEditDueDate');
    const taskEditPriority: HTMLInputElement = document.querySelector('#inputEditPriority');
    const taskEditStatus: HTMLInputElement = document.querySelector('#inputEditStatus');

    // taskEditName.value = 'foo';

    this.editTaskModal.show();
  }

  resetForm() {
    const editForm: HTMLFormElement = document.querySelector('#editTaskForm');
    editForm.reset();
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

    this.sendEditedTask.emit(editedTask);
  }
}