import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { UserInfoBoxComponent } from './sidebar/user-info-box/user-info-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TasksListComponent,
    UserInfoBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
