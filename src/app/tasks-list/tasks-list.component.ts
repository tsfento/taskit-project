import { Component, Output } from '@angular/core';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  showNewBool: boolean;
  showEditBool: boolean;
  showViewBool: boolean;

  tasks: Task[] = [
    new Task(0, 'Delete Me', 'Try to delete me.', '10/5/23', 'High', 'In Progress'),
  ];

  addTask(sentTask: Task) {
    const newTask: Task = sentTask;
    this.tasks.push(newTask);
    console.log(this.tasks);
  }

  showNewModal(bool) {
    this.showNewBool = bool;
  }

  showEditModal(bool) {
    this.showEditBool = bool;
  }

  showViewModal(bool) {
    this.showViewBool = bool;
  }

  onDelete(value) {
    this.tasks = this.tasks.slice(value);
  }
}
