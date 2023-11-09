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
  draggingTask: Task;
  taskIndex: number;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();

    this.tasksSub = this.tasksService.tasksChanged.subscribe(
      (payload) => {
        this.tasks = payload.tasks;
      }
    )
  }

  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
  }

  changeStatus(status: string, index: number) {
    this.tasksService.changeStatus(status, index);
  }

  onDragStart(index: number) {
    this.taskIndex = index;
    this.draggingTask = this.tasks[index];
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: Event) {
    const element = event.target as HTMLElement;

    if (element.classList.contains('todo-container')) {
      // this.draggingTask.status = 'To Do';
      // this.draggingTask.statusNumber = 1;
      this.tasksService.changeStatus('To Do-1', this.taskIndex);
    } else if (element.classList.contains('progress-container')) {
      // this.draggingTask.status = 'In Progress';
      // this.draggingTask.statusNumber = 2;
      this.tasksService.changeStatus('In Progress-2', this.taskIndex);
    } else if (element.classList.contains('done-container')) {
      // this.draggingTask.status = 'Done';
      // this.draggingTask.statusNumber = 3;
      this.tasksService.changeStatus('Done-3', this.taskIndex);
    }
  }
}