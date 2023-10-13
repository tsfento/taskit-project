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
  defaultSort: string = 'unformattedDate';
  filterDates: string[] = [];
  filteredArray: Task[] = [];
  filtering: boolean = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    this.generatePage();

    this.sortTable(this.defaultSort);

    this.totalPages = Math.ceil(this.tasks.length / 15);

    this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;

        this.generatePage();

        this.sortTable(this.defaultSort);

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

  showFilter(filterType: string, filter: string, date?: string) {
    const box: HTMLButtonElement = document.querySelector(filterType);
    let color: string;

    if (filter === 'Due Date' || filter === 'Priority' || filter === 'Status') {
      box.classList.remove('select-box-filtered');

      this.tasks = this.tasksService.getTasks();
      this.generatePage();
      box.innerText = filter;
      return
    } else {
      box.classList.add('select-box-filtered');
    }

    if (filter === 'Low' || filter === 'Medium' || filter === 'High') {
      if (filter === 'Low') { color = 'limegreen'; }
      if (filter === 'Medium') { color = 'gold'; }
      if (filter === 'High') { color = 'crimson'; }

      box.innerHTML = `<span class="bi bi-circle-fill" style="color: ${color}">&nbsp;</span><span style="color: black">${filter}</span>`;
    } else {
      box.innerText = filter;
    }

    if (date !== undefined) {
      filter = date;
    }

    this.tasks = this.tasksService.filterTasks(filterType, filter);
    this.generatePage();
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

  sortTable(column: string) {
    if (column === 'title' || column === 'unformattedDate') {
      this.tasks.sort(
        (a, b) => {
          let x = a[column].toLowerCase();
          let y = b[column].toLowerCase();
          if (x < y) { return -1; }
          if (x > y) { return 1; }
        }
      );
    } else {
      this.tasks.sort(
        (a, b) => {
          return a[column] - b[column];
        }
      );
    }

    this.defaultSort = column;

    this.generatePage();
  }

  changeStatus(status: string, index: number) {
    this.statusIndex = index + ((this.pageNum - 1) * this.pageRows);
    console.log(status, this.statusIndex);
    this.tasksService.changeStatus(status, this.statusIndex);
  }
}
