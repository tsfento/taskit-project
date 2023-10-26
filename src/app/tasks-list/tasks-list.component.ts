import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task } from '../shared/task.model';

import { TasksService } from '../shared/tasks.service';
import { Subscription } from 'rxjs';
import { TaskModalComponent } from './task-modal/task-modal.component';

declare var window;

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit, OnDestroy {
  @ViewChild(TaskModalComponent) taskModal: TaskModalComponent;
  tasks: Task[] = [];
  blankTask: Task = new Task(0, '', '', '', '', '', '', 0, 0);
  totalPages: number = 1;
  pageNum: number = 1;
  pageRows: number = 15;
  deleteIndex: number;
  statusIndex: number;
  tasksSub: Subscription;
  pageSub: Subscription;
  taskSort: string = 'unformattedDate';
  taskSortDir: string = 'forward';

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    this.totalPages = Math.ceil(this.tasks.length / 15);

    this.generatePage();

    this.tasksSub = this.tasksService.tasksChanged.subscribe(
      (payload) => {
        this.tasks = payload.tasks;

        this.totalPages = Math.ceil(this.tasks.length / 15);

        this.generatePage();
    });

    this.pageSub = this.tasksService.changePage.subscribe(
      (page: number) => {
        this.pageNum = page;
      }
    );
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
    this.pageSub.unsubscribe();
  }

  onTaskModal(index?: number) {
    if (index === undefined) {
      // this.tasksService.showTaskModal('taskModal');
      this.taskModal.showModal();
    } else {
      // this.tasksService.showTaskModal('taskModal', index);
      this.taskModal.showModal(index);
    }
  }

  // showViewModal(index: number) {
  //   this.tasksService.showTaskModal('taskModal', index + ((this.pageNum - 1) * this.pageRows));
  // }

  showDeleteModal(index: number) {
    this.deleteIndex = index;
    const deleteTaskModal = new window.bootstrap.Modal(document.getElementById('deleteTaskModal'));

    deleteTaskModal.show();
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
    // console.log(status, this.statusIndex);
    this.tasksService.changeStatus(status, this.statusIndex);
  }

  sortTasks(sortBy: string) {
    if (sortBy === this.taskSort) {
      if (this.taskSortDir === 'forward') {
        this.taskSortDir = 'reverse';
      } else {
        this.taskSortDir = 'forward';
      }
    } else {
      this.taskSortDir = 'forward';
      this.taskSort = sortBy;
    }
  }
}