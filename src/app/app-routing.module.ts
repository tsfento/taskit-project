import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { KanbanComponent } from "./kanban/kanban.component";
import { LandingComponent } from "./landing/landing.component";
import { ContainerComponent } from "./container/container.component";
import { ImBoredComponent } from "./im-bored/im-bored.component";

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'user', component: ContainerComponent, children: [
    { path: '', redirectTo: 'tasks-list', pathMatch: 'full' },
    { path: 'tasks-list', component: TasksListComponent },
    { path: 'kanban', component: KanbanComponent },
    { path: 'im-bored', component: ImBoredComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}