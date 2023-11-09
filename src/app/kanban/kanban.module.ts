import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { KanbanComponent } from "./kanban.component";

const route: Routes = [
  { path: '', component: KanbanComponent }
]

@NgModule({
  declarations: [
    KanbanComponent
  ],
  imports: [SharedModule, RouterModule.forChild(route)],
  exports: [RouterModule, KanbanComponent]
})
export class KanbanModule { }