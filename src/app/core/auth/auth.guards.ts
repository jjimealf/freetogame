import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { FeedbackService } from '../ui/feedback.service';
import { AuthService } from './auth.service';

function redirectToLogin(router: Router, feedback: FeedbackService, message: string): UrlTree {
  void feedback.showToast(message, 'warning');
  return router.createUrlTree(['/login'], { queryParams: { message } });
}

async function requireActiveProfile(
  authService: AuthService,
  router: Router,
  feedback: FeedbackService
): Promise<UserProfile | UrlTree> {
  const user = await firstValueFrom(authService.currentUser$);

  if (user === null) {
    return redirectToLogin(router, feedback, 'Inicia sesion para continuar.');
  }

  await authService.reloadCurrentUser();

  if (!user.emailVerified) {
    await authService.signOut();
    return redirectToLogin(router, feedback, 'Revisa tu correo para confirmar el registro.');
  }

  const profile = await authService.getCurrentProfile();

  if (profile === null) {
    await authService.signOut();
    return redirectToLogin(router, feedback, 'El perfil de usuario no existe.');
  }

  if (profile.deleted) {
    await authService.signOut();
    return redirectToLogin(router, feedback, 'La cuenta fue eliminada.');
  }

  if (!profile.active) {
    await authService.signOut();
    return redirectToLogin(router, feedback, 'Espera a que el administrador active tu cuenta.');
  }

  return profile;
}

export const activeUserGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const feedback = inject(FeedbackService);
  const profile = await requireActiveProfile(authService, router, feedback);
  return profile instanceof UrlTree ? profile : true;
};

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const feedback = inject(FeedbackService);
  const profile = await requireActiveProfile(authService, router, feedback);

  if (profile instanceof UrlTree) {
    return profile;
  }

  if (profile.role !== 'admin') {
    return redirectToLogin(router, feedback, 'No tienes permisos de administrador.');
  }

  return true;
};
