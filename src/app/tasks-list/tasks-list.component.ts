import { Component } from '@angular/core';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  tasks: Task[] = [
    new Task('Clean Out Garage', '10/02/23', 'Low', 'To Do'),
    new Task('Do Dishes', '10/04/23', 'Medium', 'To Do'),
    new Task('Pay Bills', '10/10/23', 'High', 'To Do')
  ];
}
