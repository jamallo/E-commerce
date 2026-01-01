import { ActivatedRouteSnapshot, CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";


export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const rolesPermitidos: string[] = route.data['roles'];

    if (!authService.isLogged()) {
      router.navigate(['/login']);
      return false;
    }

    const rolesUsuario = authService.getRoles();

    const autorizado = rolesPermitidos.some(rol =>
      rolesUsuario.includes(rol)
    );

    if (!autorizado) {
      router.navigate(['/productos']);
      return false;
    }

    return true;
};
