import { Component, Output, ViewChild } from '@angular/core';
import { Task } from '../shared/task.model';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  @ViewChild(ViewTaskComponent) viewTaskChild;
  @ViewChild(EditTaskComponent) editTaskChild;
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

  showEditModal() {
    this.editTaskChild.editTask();
  }

  showViewModal() {
    this.viewTaskChild.viewTask();
  }

  onDelete(value) {
    this.tasks = this.tasks.slice(value);
  }
}
