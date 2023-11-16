import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { Subscription } from 'rxjs';
import { StorageService } from '../shared/storage.service';

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

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.tasks = this.storageService.fetchTasks();

    this.tasksSub = this.storageService.tasksChanged.subscribe(
      (changedTasks) => {
        this.tasks = changedTasks.tasks;
      }
    )
  }

  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
  }

  changeStatus(status: string, index: number) {
    this.storageService.changeStatus(status, index);
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
      this.storageService.changeStatus('To Do-1', this.taskIndex);
    } else if (element.classList.contains('progress-container')) {
      // this.draggingTask.status = 'In Progress';
      // this.draggingTask.statusNumber = 2;
      this.storageService.changeStatus('In Progress-2', this.taskIndex);
    } else if (element.classList.contains('done-container')) {
      // this.draggingTask.status = 'Done';
      // this.draggingTask.statusNumber = 3;
      this.storageService.changeStatus('Done-3', this.taskIndex);
    }
  }
}