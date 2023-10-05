import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

declare var window;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  editTaskModal;

  ngOnInit() {
    this.editTaskModal = new window.bootstrap.Modal(document.getElementById('editTaskModal'));
  }

  editTask() {
    this.editTaskModal.show();
  }
}