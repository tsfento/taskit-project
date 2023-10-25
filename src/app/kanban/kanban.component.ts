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
    this.draggingTask = this.tasks[index];
  }

  onDragOver(event: Event) {
    event.preventDefault();
    // console.log(event.target);
  }

  onDrop(event: Event) {
    const element = event.target as HTMLElement;

    if (element.classList.contains('todo-container')) {
      this.draggingTask.status = 'To Do';
      this.draggingTask.statusNumber = 1;
    } else if (element.classList.contains('progress-container')) {
      this.draggingTask.status = 'In Progress';
      this.draggingTask.statusNumber = 2;
    } else if (element.classList.contains('done-container')) {
      this.draggingTask.status = 'Done';
      this.draggingTask.statusNumber = 3;
    }
  }
}