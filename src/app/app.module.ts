import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { UserInfoBoxComponent } from './sidebar/user-info-box/user-info-box.component';
import { NewTaskComponent } from './tasks-list/new-task/new-task.component';
import { ViewTaskComponent } from './tasks-list/view-task/view-task.component';
import { EditTaskComponent } from './tasks-list/edit-task/edit-task.component';
import { KanbanComponent } from './kanban/kanban.component';

const appRoutes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'tasks-list', component: TasksListComponent },
  { path: 'kanban', component: KanbanComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TasksListComponent,
    UserInfoBoxComponent,
    NewTaskComponent,
    ViewTaskComponent,
    EditTaskComponent,
    KanbanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
