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

    this.totalPages = Math.ceil(this.tasks.length / 15);

    this.generatePage();

    this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;

        this.totalPages = Math.ceil(this.tasks.length / 15);

        this.generatePage();
    });

    this.tasksService.changePage.subscribe(
      (page: number) => {
        this.pageNum = page;
      }
    );
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
    this.deleteIndex = index;
    this.tasksService.showTaskModal('deleteTaskModal');
    console.log(index);
  }

  deleteTask(index: number) {
    this.tasksService.deleteTask(index);
  }

  generatePage() {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks.length < this.totalPages * 15) {
        this.tasks.push(this.blankTask);
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