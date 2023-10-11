import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() pageToEmit = new EventEmitter<string>();
  pageToShow: string = 'task-list';

  onChangePage(page: string) {
    this.pageToShow = page;
    this.pageToEmit.emit(page);
  }
}
