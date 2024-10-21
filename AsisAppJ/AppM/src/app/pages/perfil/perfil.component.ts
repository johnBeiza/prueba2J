import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { usuario } from './../../models/bd.models';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  usuario : usuario | null = null;
  private  authService = inject(AuthService);

  subscriptionAuthService: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
    this.subscriptionAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      console.log('Header:', usuario);
    });
  }

}
