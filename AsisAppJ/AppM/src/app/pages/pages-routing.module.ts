import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ClaseComponent } from './clase/clase.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { DocenteComponent } from './docente/docente.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { LogoutComponent } from './logout/logout.component';

import { authGuard } from '../guard/auth.guard';
import { redirectIfAuthGuard } from '../guard/redirect-if-auth.guard';
const routes: Routes = [
  {path:'alumno',component:AlumnoComponent, canActivate: [authGuard]},
  {path:'docente',component:DocenteComponent, canActivate: [authGuard]},
  {path:'login', component: LoginComponent,canActivate: [redirectIfAuthGuard]},
  {path:'alumno/asignaturas',component:AsignaturasComponent, canActivate: [authGuard]},
  {path:'password',component:PasswordComponent,canActivate: [redirectIfAuthGuard]},
  {path:'perfil',component:PerfilComponent , canActivate: [authGuard]},
  {path:'docente/clase',component:ClaseComponent, canActivate: [authGuard]},
  {path:'registrar', component:RegistrarComponent,canActivate: [redirectIfAuthGuard]},
  {path:'logout', component: LogoutComponent, canActivate: [redirectIfAuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir a 'login' si la ruta está vacía
  {path: '**', redirectTo: 'login', pathMatch: 'full' }, // Redirigir a 'login' para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }