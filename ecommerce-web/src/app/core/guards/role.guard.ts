import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";


export const roleGuard = (roleEsperado: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const rol = authService.getUserRole();

    if (rol === roleEsperado) {
      return true;
    }

    router.navigate(['/login']);
    return false;
  };
};
