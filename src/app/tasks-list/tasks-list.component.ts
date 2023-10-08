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
  idToDelete: number;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
  }

  showEditModal(id: number) {
    this.tasksService.showTaskModal('editTaskModal', id);
  }

  showViewModal(id: number) {
    this.tasksService.showTaskModal('viewTaskModal', id);
  }

  showDeleteModal(id: number) {
    this.idToDelete = id;
    this.tasksService.showTaskModal('deleteTaskModal', id);
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id);
  }
}
