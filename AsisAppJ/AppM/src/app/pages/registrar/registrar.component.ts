import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {

  nombreCompleto: string = '';
  usuario: string = '';
  clave: string = '';
  tipo: string = 'alumno';

  errorMessage: string = '';
  successMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController = inject(AlertController);

  registroFallido: boolean = false;

  async validarUsuarioExistente(usuario: string): Promise<boolean> {
    try {
      const usuariosExistentes = await this.authService.obtenerUsuarios();
      return usuariosExistentes.some(u => u.usuario === usuario);
    } catch (error) {
      this.errorMessage = 'Error al validar el usuario';
      await this.mostrarAlerta('Error', 'Error al validar el usuario. Intentelo de nuevo.');
      return true;
    }
  }

  async registrar() {
    if(this.nombreCompleto === '' || this.usuario === '' || this.clave === '' || this.tipo === '') {
      this.errorMessage = 'Por favor, complete todos los campos.';
      await this.mostrarAlerta('Error', this.errorMessage);
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.registroFallido = false;
    
    const usuarioExiste = await this.validarUsuarioExistente(this.usuario);

    if (usuarioExiste) {
      this.errorMessage = 'El usuario ya existe. Por favor, elija otro.';
      this.registroFallido = true;
      await this.mostrarAlerta('Error', this.errorMessage);
      return;
    }

    const usuario = {
      nombreCompleto: this.nombreCompleto,
      usuario: this.usuario,
      clave: this.clave,
      tipo: this.tipo};

    try {
      await this.authService.registrarNuevoUsuario(usuario);
      this.successMessage = 'Usuario registrado exitosamente';
      await this.mostrarAlerta('Exito', this.successMessage);
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorMessage = 'Error al registrar el usuario';
      this.registroFallido = true;
      await this.mostrarAlerta('Error', this.errorMessage);
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }}

