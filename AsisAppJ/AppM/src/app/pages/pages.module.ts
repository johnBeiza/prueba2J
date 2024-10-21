import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from './password/password.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ClaseComponent } from './clase/clase.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { DocenteComponent } from './docente/docente.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    LoginComponent,
    PasswordComponent,
    LogoutComponent,
    PerfilComponent,
    ClaseComponent,
    RegistrarComponent,
    AlumnoComponent,
    DocenteComponent,
    AsignaturasComponent
  ], //aqui deben ir los componentes que se agregaran
  imports: [ // aqui se importa el modulo de rutas
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    IonicModule,
    FormsModule
]
})
export class PagesModule { }
