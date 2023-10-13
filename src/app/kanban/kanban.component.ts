import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  tasks: Task[] = [];
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();

    this.initTasks();

    this.separateTasks();

    this.sortTasks(this.toDoTasks);
    this.sortTasks(this.inProgressTasks);
    this.sortTasks(this.doneTasks);

    this.tasksService.tasksChanged.subscribe(
      (changedTasks: Task[]) => {
        this.tasks = changedTasks;

        this.initTasks();

        this.separateTasks();

        this.sortTasks(this.toDoTasks);
        this.sortTasks(this.inProgressTasks);
        this.sortTasks(this.doneTasks);
      }
    )
  }

  initTasks() {
    this.toDoTasks = [];
    this.inProgressTasks = [];
    this.doneTasks = [];
  }

  sortTasks(taskArray: Task[]) {
    taskArray.sort(
      (a, b) => {
        let x = a.unformattedDate;
        let y = b.unformattedDate;
        if (x < y) { return -1; }
        if (x > y) { return 1; }
      }
    );
  }

  separateTasks() {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].statusNumber === 1) {
        this.tasks[i].index = i;
        this.toDoTasks.push(this.tasks[i]);
      }

      if (this.tasks[i].statusNumber === 2) {
        this.tasks[i].index = i;
        this.inProgressTasks.push(this.tasks[i]);
      }

      if (this.tasks[i].statusNumber === 3) {
        this.tasks[i].index = i;
        this.doneTasks.push(this.tasks[i]);
      }
    }
  }

  changeStatus(status: string, index: number, taskArray: Task[]) {
    this.tasksService.changeStatus(status, taskArray[index].index);
  }
}