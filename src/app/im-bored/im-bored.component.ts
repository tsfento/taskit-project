import { Component } from '@angular/core';

@Component({
  selector: 'app-im-bored',
  templateUrl: './im-bored.component.html',
  styleUrls: ['./im-bored.component.css']
})
export class ImBoredComponent {
  taskGenerated: boolean = false;
  taskTitle: string = '';

  generateTask() {
    this.taskGenerated = true;
  }

  addTask() {
  }
}
