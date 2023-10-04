import { Component, Input, OnInit, OnChanges } from '@angular/core';

declare var window;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit, OnChanges {
  @Input() toShow: boolean;
  newTaskModal;

  ngOnInit() {
    this.newTaskModal = new window.bootstrap.Modal(document.getElementById('newTaskModal'));
    this.newTaskModal.show();
  }

  ngOnChanges(toShow) {
    if (toShow) {
      this.newTaskModal.show();
    }
  }
}