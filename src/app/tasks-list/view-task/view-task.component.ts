import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/shared/tasks.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})

export class ViewTaskComponent {
  constructor(private tasksService: TasksService) {}

  // viewTask(id) {
  //   this.tasksService.showTaskModal('viewTaskModal', id);
  // }
}