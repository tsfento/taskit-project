import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;

      if (isAuth) {
        if (route.routeConfig?.path === '') {
          return router.createUrlTree(['user']);
        }

        return true;
      } else {
        if (route.routeConfig?.path === '') {
          return true;
        }

        return router.createUrlTree(['']);
      }
    })
  );
};