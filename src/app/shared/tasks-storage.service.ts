import { Injectable } from "@angular/core";
import { UsersStorageService } from "./users-storage.service";
import { HttpClient } from "@angular/common/http";
import { Task } from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksStorageService {
  constructor(private usersStoragService: UsersStorageService, private http: HttpClient) {}

  storeTasks(tasks: Task[]) {
    const userId = this.usersStoragService.userId;

    this.http.put(
      `https://taskit-project-default-rtdb.firebaseio.com/${userId}.json`,
      tasks
    ).subscribe(response => {
      // console.log(response);
    })
  }

  fetchTasks() {
    const userId = this.usersStoragService.userId;
  }
}