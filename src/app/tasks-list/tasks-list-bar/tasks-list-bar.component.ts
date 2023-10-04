import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks-list-bar',
  templateUrl: './tasks-list-bar.component.html',
  styleUrls: ['./tasks-list-bar.component.css']
})
export class TasksListBarComponent {
  @Output() addNewTesk = new EventEmitter<boolean>();
  newTask: boolean = false;

  onNewTask(bool) {
    this.addNewTesk.emit(bool);
  }
}