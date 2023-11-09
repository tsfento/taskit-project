import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ContainerComponent } from "./container.component";
import { SharedModule } from "../shared/shared.module";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { UserInfoBoxComponent } from "../sidebar/user-info-box/user-info-box.component";

const routes: Routes = [
  { path: '',
    component: ContainerComponent,
    children: [
    { path: '', redirectTo: 'tasks-list', pathMatch: 'full' },
    {
      path: 'tasks-list',
      loadChildren: () => import('../tasks-list/tasks-list.module').then((m) => m.TasksListModule)
    },
    {
      path: 'kanban',
      loadChildren: () => import('../kanban/kanban.module').then((m) => m.KanbanModule)
    },
    {
      path: 'im-bored',
      loadChildren: () => import('../im-bored/im-bored.module').then((m) => m.ImBoredModule)
    },
  ]},
]

@NgModule({
  declarations: [
    ContainerComponent,
    SidebarComponent,
    UserInfoBoxComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerModule { }