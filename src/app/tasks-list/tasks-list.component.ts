import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';

import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  providers: [TasksService]
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  deleteIndex: number;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;
    });
  }

  showEditModal(index: number) {
    this.tasksService.showTaskModal('editTaskModal', index);
  }

  showViewModal(index: number) {
    this.tasksService.showTaskModal('viewTaskModal', index);
  }

  showDeleteModal(index: number) {
    this.deleteIndex = index;
    this.tasksService.showTaskModal('deleteTaskModal', index);
  }

  deleteTask(index: number) {
    this.deleteIndex = index;
    console.log(this.deleteIndex);
    this.tasksService.deleteTask(index);
  }
}
