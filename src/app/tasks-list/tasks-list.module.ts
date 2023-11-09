import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { TasksListComponent } from "./tasks-list.component";

const route: Routes = [
  { path: '', component: TasksListComponent }
]

@NgModule({
  declarations: [
    TasksListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(route)],
  exports: [RouterModule, TasksListComponent]
})
export class TasksListModule { }