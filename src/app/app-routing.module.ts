import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { authGuard } from "./shared/auth.guard";

const appRoutes: Routes = [
  { path: '', component: LandingComponent, canActivate: [authGuard] },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () => import('./container/container.module').then((m) => m.ContainerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})

export class AppRoutingModule {}