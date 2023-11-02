import { Injectable } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { Subscription, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  tasks: Task[] = [];

  constructor(private http: HttpClient, private tasksService: TasksService) { }

  getTaskFromBored() {
    return this.http.get<Task>('http://www.boredapi.com/api/activity/');
  }
}