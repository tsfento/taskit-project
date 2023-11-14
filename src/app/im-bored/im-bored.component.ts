import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { TaskModalComponent } from '../tasks-list/task-modal/task-modal.component';

@Component({
  selector: 'app-im-bored',
  templateUrl: './im-bored.component.html',
  styleUrls: ['./im-bored.component.css']
})
export class ImBoredComponent {
  @ViewChild(TaskModalComponent) taskModal: TaskModalComponent;
  taskGenerated: boolean = false;
  activity: string = '';

  constructor(private httpService: HttpService) { }

  generateTask() {
    this.httpService.getTaskFromBored().subscribe(data => {
      console.log(data);
      this.activity = data['activity'];
    });
    this.taskGenerated = true;
  }

  addTask() {
    this.taskModal.addBoredTask(this.activity)
  }
}
