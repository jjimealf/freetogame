import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { activeUserGuard, adminGuard } from './core/auth/auth.guards';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'juegos',
    canActivate: [activeUserGuard],
    loadChildren: () => import('./juegos/juegos.module').then(m => m.UserPageModule)
  },
  {
    path: 'plataformas',
    canActivate: [activeUserGuard],
    loadChildren: () => import('./plataformas/plataformas.module').then(m => m.PlataformasPageModule)
  },
  {
    path: 'favoritos',
    canActivate: [activeUserGuard],
    loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosPageModule)
  },
  {
    path: 'grafica',
    canActivate: [activeUserGuard],
    loadChildren: () => import('./grafica/grafica.module').then(m => m.GraficaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
