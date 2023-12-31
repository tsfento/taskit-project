import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskModalComponent } from "../tasks-list/task-modal/task-modal.component";
import { FormatDatePipe } from "./pipes/format-date.pipe";
import { SortTasksPipe } from "./pipes/sort-tasks.pipe";
import { FilterTasksPipe } from "./pipes/filter-tasks.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GeneratePagesPipe } from "./pipes/generate-pages.pipe";

@NgModule({
  declarations: [
    TaskModalComponent,
    FormatDatePipe,
    SortTasksPipe,
    FilterTasksPipe,
    GeneratePagesPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    TaskModalComponent,
    FormatDatePipe,
    SortTasksPipe,
    FilterTasksPipe,
    GeneratePagesPipe
  ]
})
export class SharedModule { }