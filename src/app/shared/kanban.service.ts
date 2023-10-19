import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanService implements OnInit, OnDestroy {
  tasks: Task[] = [];
  tasksSub: Subscription;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    this.tasksSub = this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;
      }
    )
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
