import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksListBarComponent } from './tasks-list/tasks-list-bar/tasks-list-bar.component';
import { UserInfoBoxComponent } from './sidebar/user-info-box/user-info-box.component';
import { NewTaskComponent } from './tasks-list/new-task/new-task.component';
import { ViewTaskComponent } from './tasks-list/view-task/view-task.component';
import { EditTaskComponent } from './tasks-list/edit-task/edit-task.component';
import { KanbanComponent } from './kanban/kanban.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TasksListComponent,
    TasksListBarComponent,
    UserInfoBoxComponent,
    NewTaskComponent,
    ViewTaskComponent,
    EditTaskComponent,
    KanbanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
