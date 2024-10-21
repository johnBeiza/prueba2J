import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
// @ts-ignore
import QRious from 'qrious';
import { Subscription } from 'rxjs';
import { usuario } from 'src/app/models/bd.models';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-docente',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss']
})
export class ClaseComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService); // Obtener el servicio de autenticación// Campo para almacenar el nombre del usuario
  usuario: usuario | null = null;
  subscriptionAuthService: Subscription = new Subscription(); // Subscripción para el observable del estado de autenticación

  asignaturas = [
    { nombre: 'Programacion movil', id: 'INF001' },
    { nombre: 'matematicas aplicada', id: 'INF002' },
    { nombre: 'Programacion Web', id: 'INF003' },
    { nombre: 'Arquitectura', id: 'INF004' },
    { nombre: 'base de datos', id: 'INF005' },
  ];

  qrData: string = ''; // Almacena los datos del QR
  showQRCode: boolean = false; // Controla la visibilidad del código QR

  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>; // Referencia al canvas

  generarQR(asignaturaId: string) { // Generar la QR
    const fechaActual = new Date();
    // Formatear la fecha con guiones
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11, por eso sumamos 1
    const día = String(fechaActual.getDate()).padStart(2, '0');
    // Formatear la hora con :
    const horas = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');

    // Concatenar la fecha y hora con el formato deseado
    const fechaHora = `${año}-${mes}-${día},${horas}:${minutos}:${segundos}`;
    this.qrData = `http://localhost:8100/asistencia/${asignaturaId}/${this.usuario.nombreCompleto}/${fechaHora}`;

    this.showQRCode = true; // Muestra el código QR
    this.createQR(); // Genera el código QR
  }

  createQR() {
    const qr = new QRious({
      element: this.qrCanvas.nativeElement,
      value: this.qrData,
      size: 256, // Tamaño del QR
      level: 'M' // Nivel de corrección de errores
    });
  }

  ngOnInit() {
    this.subscriptionAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario
      console.log('Docente:', usuario);
    }); // Obtiene el nombre del usuario logueado
  }

  ngOnDestroy() {
    this.subscriptionAuthService?.unsubscribe(); // Desuscribirse del observable del estado de autenticación
  }

}