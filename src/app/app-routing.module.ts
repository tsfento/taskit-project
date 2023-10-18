import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { KanbanComponent } from "./kanban/kanban.component";
import { LandingComponent } from "./landing/landing.component";
import { ContainerComponent } from "./container/container.component";

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'user', component: ContainerComponent, children: [
    { path: '', redirectTo: 'tasks-list', pathMatch: 'full' },
    { path: 'tasks-list', component: TasksListComponent },
    { path: 'kanban', component: KanbanComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}