import { Component, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/shared/tasks.service';

@Component({
  selector: 'app-tasks-list-bar',
  templateUrl: './tasks-list-bar.component.html',
  styleUrls: ['./tasks-list-bar.component.css']
})
export class TasksListBarComponent {
  constructor(private tasksService: TasksService) {}

  onNewTask() {
    this.tasksService.showTaskModal('newTaskModal');
  }
}