import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task } from '../shared/task.model';

import { Subscription } from 'rxjs';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { StorageService } from '../shared/storage.service';
import { FormatDatePipe } from '../shared/pipes/format-date.pipe';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

declare var window;

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  animations: [
    trigger('highlightTask', [
      transition('void => true', animate(3000, keyframes([
        style({
          'background-color': 'transparent',
          offset: 0
        }),
        style({
          'background-color': 'limegreen',
          offset: 0.3
        }),
        style({
          'background-color': 'transparent',
          offset: 1
        })
      ]))),
    ])
  ]
})
export class TasksListComponent implements OnInit, OnDestroy {
  @ViewChild(TaskModalComponent) taskModal: TaskModalComponent;
  tasks: Task[] = [];
  blankTask: Task = new Task(0, '', '', '', '', '', '', 0, 0);
  totalPages: number = 1;
  pageNum: number = 1;
  pageRows: number = 15;
  deleteIndex: number;
  tasksFetchedSub: Subscription;
  tasksChangedSub: Subscription;
  pageSub: Subscription;
  taskSort: string;
  formatDatePipe = new FormatDatePipe;
  taskSortDir: string;
  dueDateFilter: string;
  priorityFilter: number;
  statusFilter: number;
  dueDates: string[] = [];
  taskIdToHighlight: number;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.tasks = this.storageService.fetchTasks();

    this.totalPages = Math.ceil(this.tasks.length / 15);

    this.generatePage();

    this.tasksFetchedSub = this.storageService.tasksFetched.subscribe(
      (fetchedTasks) => {
        this.tasks = fetchedTasks;

        this.generateDates();

        this.totalPages = Math.ceil(this.tasks.length / 15);

        this.generatePage();
      }
    )

    this.tasksChangedSub = this.storageService.tasksChanged.subscribe(
      (changedTasks) => {
        this.tasks = changedTasks.tasks;

        if (changedTasks.action !== 'was deleted') {
          this.taskIdToHighlight = changedTasks.task.id;
        }

        this.generateDates();

        this.totalPages = Math.ceil(this.tasks.length / 15);

        this.generatePage();
      }
    );

    this.pageSub = this.storageService.changePage.subscribe(
      (page) => {
        this.taskSort = 'unformattedDate';
        this.taskSortDir = 'asc';
        this.pageNum = page;
      }
    );
  }

  ngOnDestroy() {
    this.tasksChangedSub.unsubscribe();
    this.pageSub.unsubscribe();
  }

  onTaskModal(taskId?: number, isViewing?: boolean) {
    const index = this.storageService.findTaskIndex(taskId);
    if (taskId === undefined) {
      this.taskModal.showModal(undefined);
    } else {
      this.taskModal.showModal(index, isViewing);
    }
  }

  showDeleteModal(taskId: number) {
    const index = this.storageService.findTaskIndex(taskId);
    this.deleteIndex = index;
    const deleteTaskModal = new window.bootstrap.Modal(document.getElementById('deleteTaskModal'));

    deleteTaskModal.show();
  }

  deleteTask(index: number) {
    this.storageService.deleteTask(index);
  }

  generatePage() {
    if (this.tasks.length === 0) {
      while (this.tasks.length < 15) {
        this.tasks.push(this.blankTask);
      }
    }

    while (this.tasks.length < this.totalPages * 15) {
      this.tasks.push(this.blankTask);
    }
  }

  prevPage() {
    this.taskIdToHighlight = null;
    if (this.pageNum !== 1) {
      this.pageNum--;

      this.generatePage();
    }
  }

  nextPage() {
    this.taskIdToHighlight = null;
    if (this.pageNum !== (Math.ceil(this.tasks.length / 15))) {
      this.pageNum++;

      this.generatePage();
    }
  }

  generateDates() {
    this.dueDates = [];

    this.tasks.forEach((task) => {
      if (!this.dueDates.includes(task.unformattedDate)) {
        this.dueDates.push(task.unformattedDate);
      }
    });

    this.dueDates.sort();
  }

  changeStatus(status: string, taskId: number) {
    const index = this.storageService.findTaskIndex(taskId);
    this.storageService.changeStatus(status, index);
  }

  sortTasks(sortBy: string) {
    if (sortBy === this.taskSort) {
      if (this.taskSortDir === 'asc') {
        this.taskSortDir = 'desc';
      } else {
        this.taskSortDir = 'asc';
      }
    } else {
      this.taskSortDir = 'asc';
      this.taskSort = sortBy;
    }
  }

  filterByDate(date: string, button: HTMLButtonElement) {
    const taskTable: HTMLTableElement = document.querySelector('#taskTable');

    if (date === null) {
      button.classList.remove('select-box-filtered');
      button.innerText = 'Due Date';
      this.dueDateFilter = undefined;
    } else {
      button.classList.add('select-box-filtered');
      button.innerText = this.formatDatePipe.transform(date);
      this.dueDateFilter = date;
    }
  }

  filterByPriority(number: number, button: HTMLButtonElement) {
    if (number === 0) {
      button.classList.remove('select-box-filtered');
      button.innerText = 'Priority';
      this.priorityFilter = undefined;
    } else if (number === 1) {
      button.classList.add('select-box-filtered');
      button.innerText = 'Low';
      this.priorityFilter = 1;
    } else if (number === 2) {
      button.classList.add('select-box-filtered');
      button.innerText = 'Medium';
      this.priorityFilter = 2;
    } else if (number === 3) {
      button.classList.add('select-box-filtered');
      button.innerText = 'High';
      this.priorityFilter = 3;
    }
  }

  filterByStatus(number: number, button: HTMLButtonElement) {
    if (number === 0) {
      button.classList.remove('select-box-filtered');
      button.innerText = 'Status';
      this.statusFilter = undefined;
    } else if (number === 1) {
      button.classList.add('select-box-filtered');
      button.innerText = 'To Do';
      this.statusFilter = 1;
    } else if (number === 2) {
      button.classList.add('select-box-filtered');
      button.innerText = 'In Progress';
      this.statusFilter = 2;
    } else if (number === 3) {
      button.classList.add('select-box-filtered');
      button.innerText = 'Done';
      this.statusFilter = 3;
    }
  }
}