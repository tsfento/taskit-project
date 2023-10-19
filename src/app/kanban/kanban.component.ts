import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  tasksSub: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();

    this.tasksSub = this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;
      }
    )
  }

  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
  }

  changeStatus(status: string, index: number) {
    this.tasksService.changeStatus(status, index);
  }
}