import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ImBoredComponent } from "./im-bored.component";

const route: Routes = [
  { path: '', component: ImBoredComponent }
]

@NgModule({
  declarations: [
    ImBoredComponent
  ],
  imports: [SharedModule, RouterModule.forChild(route)],
  exports: [RouterModule, ImBoredComponent]
})
export class ImBoredModule { }