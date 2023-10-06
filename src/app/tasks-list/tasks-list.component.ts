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

  @Output() tasks: Task[] = [
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

  showEditModal(id: number[]) {
    this.editTaskChild.editTask();
    console.log(id);
  }

  showViewModal(id: number[]) {
    this.viewTaskChild.viewTask();
    console.log(id);
  }

  showDeleteModal(id: number[]) {
    console.log(id);
  }
}
