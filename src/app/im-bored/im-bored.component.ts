import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModalComponent } from '../tasks-list/task-modal/task-modal.component';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-im-bored',
  templateUrl: './im-bored.component.html',
  styleUrls: ['./im-bored.component.css']
})
export class ImBoredComponent {
  @ViewChild(TaskModalComponent) taskModal: TaskModalComponent;
  taskGenerated: boolean = false;
  activity: string = '';

  constructor(private http: HttpClient) { }

  generateTask() {
    this.http.get<Task>('https://www.boredapi.com/api/activity/').subscribe(data => {
      this.activity = data['activity'];
    });
    this.taskGenerated = true;
  }

  addTask() {
    this.taskModal.addBoredTask(this.activity);
  }
}
