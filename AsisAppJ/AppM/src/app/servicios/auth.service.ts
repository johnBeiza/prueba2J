import { usuario } from '../models/bd.models';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<usuario | null>(null); //importar la interfaz usuario
  usuario$ = this.usuarioSubject.asObservable();

  private usuarioTipoSubject = new BehaviorSubject<String>('');
  usuarioTipo$ = this.usuarioTipoSubject.asObservable();

  private loginFailSubject = new BehaviorSubject<boolean>(false);
  loginFail$ = this.loginFailSubject.asObservable();

  webservice = inject(WebService);

  // URL base de MockAPI, apunta a la colección principal "AppAsi"
  url= 'https://670eccbc3e7151861655d148.mockapi.io/api/v1/AppAsi';

  async BuscarBD(usuario: string, clave: string) {
    // Se quita 'usuarios' ya que 'AppAsi' parece ser la colección principal
    const res = await this.webservice.request('GET', this.url) as Array<usuario>;
    const user = res.find(u => u.usuario === usuario && u.clave === clave);
      if (user) {
        this.isAuthenticatedSubject.next(true);
        this.usuarioSubject.next(user);
        this.usuarioTipoSubject.next(user.tipo);
        this.loginFailSubject.next(false);
      } else {
        this.isAuthenticatedSubject.next(false);
        this.loginFailSubject.next(true);
      }
    }

  async obtenerUsuarios(): Promise<usuario[]> {
    try {
      // Se quita 'usuarios' ya que 'AppAsi' parece ser la colección principal
      const res = await this.webservice.request('GET', this.url) as Array<usuario>;
      return res;
    } catch (error) {
      throw error;
    }
  }

  async registrarNuevoUsuario(usuario: any) {
    try {
      const usuariosExistentes = await this.obtenerUsuarios();
      const usuarioExistente = usuariosExistentes.find( u => u.usuario === usuario.user);

      if (usuarioExistente) {
        throw new Error('El usuario ya existe');
      }

      // Se quita 'usuarios' ya que 'AppAsi' parece ser la colección principal
      const res = await this.webservice.request('POST', this.url, '', usuario);
      console.log('Usuario registrado con exito', res);
      return res;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.usuarioSubject.next(null);
    this.usuarioTipoSubject.next('');
    this.loginFailSubject.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated$;
  }
}
