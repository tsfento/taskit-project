import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  tasks: Task[] = [];

  constructor(private http: HttpClient) { }

  getTaskFromBored() {
    return this.http.get<Task>('http://www.boredapi.com/api/activity/');
  }
}