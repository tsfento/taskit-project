import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskModalComponent } from "../tasks-list/task-modal/task-modal.component";
import { ToastComponent } from "../toast/toast.component";
import { FormatDatePipe } from "./pipes/format-date.pipe";
import { SortTasksPipe } from "./pipes/sort-tasks.pipe";
import { ViewTaskComponent } from "../tasks-list/view-task/view-task.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TaskModalComponent,
    ToastComponent,
    FormatDatePipe,
    SortTasksPipe,
    ViewTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskModalComponent,
    ToastComponent,
    FormatDatePipe,
    SortTasksPipe,
    ViewTaskComponent
  ]
})
export class SharedModule { }