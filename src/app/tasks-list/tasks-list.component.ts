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
  page: Task[] = [];
  totalPages: number = 1;
  pageNum: number = 1;
  pageRows: number = 15;
  deleteIndex: number;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    this.generatePage();

    this.totalPages = Math.ceil(this.tasks.length / 15);

    this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;

        this.generatePage();

        this.totalPages = Math.ceil(this.tasks.length / 15);
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
    this.tasksService.deleteTask(index);
  }

  generatePage() {
    this.page = [];

    for (let i = (this.pageNum - 1) * this.pageRows; i < this.pageRows * this.pageNum; i++ ) {
      this.page.push(this.tasks[i]);
    }
  }

  switchPageNum(direction: string) {
    if (direction === 'forward') {
      if (this.pageNum !== (Math.ceil(this.tasks.length / 15))) {
        this.pageNum++;

        this.generatePage();
      }
    } else if (direction === 'back') {
      if (this.pageNum !== 1) {
        this.pageNum--;

        this.generatePage();
      }
    }
  }
}
