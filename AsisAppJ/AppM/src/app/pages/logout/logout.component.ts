import { Component, OnInit, inject } from '@angular/core';
import { delay } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent  implements OnInit {

  private router = inject(Router);


  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['login']); // Redirigir a la página de login
    }, 1500); // Simular un tiempo de espera de 3 segundos

  }

}
