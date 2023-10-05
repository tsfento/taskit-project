import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

declare var window;

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  viewTaskModal;

  ngOnInit() {
    this.viewTaskModal = new window.bootstrap.Modal(document.getElementById('viewTaskModal'));
  }

  viewTask() {
    this.viewTaskModal.show();
  }
}