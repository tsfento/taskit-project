import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { UserInfoBoxComponent } from './sidebar/user-info-box/user-info-box.component';
import { ViewTaskComponent } from './tasks-list/view-task/view-task.component';
import { KanbanComponent } from './kanban/kanban.component';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { ContainerComponent } from './container/container.component';
import { TaskModalComponent } from './tasks-list/task-modal/task-modal.component';
import { ToastComponent } from './toast/toast.component';
import { FormatDatePipe } from './shared/pipes/format-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TasksListComponent,
    UserInfoBoxComponent,
    ViewTaskComponent,
    KanbanComponent,
    LandingComponent,
    ContainerComponent,
    TaskModalComponent,
    ToastComponent,
    FormatDatePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
