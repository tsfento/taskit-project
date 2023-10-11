import { Injectable, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanService implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;
      }
    )
  }
}
