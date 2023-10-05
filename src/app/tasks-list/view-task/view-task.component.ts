import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

declare var window;

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit, OnChanges {
  @Input() toShowView: boolean;
  viewTaskModal;

  ngOnInit() {
    this.viewTaskModal = new window.bootstrap.Modal(document.getElementById('viewTaskModal'));
  }

  ngOnChanges(toShowEdit) {
    if (toShowEdit) {
      this.viewTaskModal.show();
    }
  }
}