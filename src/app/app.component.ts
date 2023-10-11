import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageShow: string = 'kanban';

  changePage(page: string) {
    this.pageShow = page;
  }
}
