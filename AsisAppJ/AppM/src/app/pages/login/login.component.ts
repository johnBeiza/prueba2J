import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

//import { trigger, transition, style, animate } from '@angular/animations'; // Animaciones de trancicion



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent  implements OnInit {

  usuario: string = '';
  clave: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  private loginFailSubject = new BehaviorSubject<boolean>(false);
  loginFail$ = this.loginFailSubject.asObservable();
  loginFail: boolean = false;

  ngOnInit(): void {
    this.authService.loginFail$.subscribe(loginFail => this.loginFail = loginFail);



  }

  constructor() { }

  isLoading: boolean = false;
  async login(usuario: string, clave: string): Promise<void> { 
    this.isLoading = true; 
    this.loginFail = false; 

    await this.authService.BuscarBD(usuario, clave);

    this.isLoading = false;

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.usuario = ''; // Limpiar el campo de usuario
          this.clave = ''; // Limpiar el campo de clave
          this.authService.usuarioTipo$.subscribe(usuarioTipoSubject => {
          if (usuarioTipoSubject === "docente") {
            this.usuario = ''; // Limpiar el campo de usuario
            this.clave = ''; // Limpiar el campo de clave
            this.router.navigate(['/docente']); // Redirigir al usuario docente si el login es exitoso
          }
          else{
            this.usuario = ''; // Limpiar el campo de usuario
            this.clave = ''; // Limpiar el campo de clave
            this.router.navigate(['/alumno']); // Redirigir al usuario alumno si el login es exitoso
          }});
        } else {
          this.loginFail = true; // Mostrar mensaje de error si el login falla
        }

      });

    };
}
