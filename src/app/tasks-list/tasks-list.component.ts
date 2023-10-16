import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';

import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  blankTask: Task = new Task(0, '', '', '', '', '', '', 0, 0);
  page: Task[] = [];
  totalPages: number = 1;
  pageNum: number = 1;
  pageRows: number = 15;
  pageIndex: number;
  deleteIndex: number;
  statusIndex: number;

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

    this.tasksService.changePage.subscribe(
      (page: number) => {
        this.pageNum = page;
        this.generatePage();
      }
    )
  }

  onNewTask() {
    this.tasksService.showTaskModal('newTaskModal');
  }

  showEditModal(index: number) {
    this.tasksService.showTaskModal('editTaskModal', index + ((this.pageNum - 1) * this.pageRows));
  }

  showViewModal(index: number) {
    this.tasksService.showTaskModal('viewTaskModal', index + ((this.pageNum - 1) * this.pageRows));
  }

  showDeleteModal(index: number) {
    this.pageIndex = index;
    this.deleteIndex = index + ((this.pageNum - 1) * this.pageRows);
    this.tasksService.showTaskModal('deleteTaskModal');
  }

  deleteTask(index: number) {
    this.tasksService.deleteTask(index);
  }

  generatePage() {
    this.page = [];

    for (let i = (this.pageNum - 1) * this.pageRows; i < this.pageRows * this.pageNum; i++ ) {
      if (i + 1 > this.tasks.length) {
        this.page.push(this.blankTask);
      } else {
        this.page.push(this.tasks[i]);
      }
    }
  }

  prevPage() {
    if (this.pageNum !== 1) {
      this.pageNum--;

      this.generatePage();
    }
  }

  nextPage() {
    if (this.pageNum !== (Math.ceil(this.tasks.length / 15))) {
      this.pageNum++;

      this.generatePage();
    }
  }

  changeStatus(status: string, index: number) {
    this.statusIndex = index + ((this.pageNum - 1) * this.pageRows);
    console.log(status, this.statusIndex);
    this.tasksService.changeStatus(status, this.statusIndex);
  }
}
