import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss'],
})
export class AsignaturasComponent  implements OnInit {

  asignaturas = [
    { nombre: 'Programacion movil', id: 'INF001' },
    { nombre: 'matematicas aplicada', id: 'INF002' },
    { nombre: 'Programacion Web', id: 'INF003' },
    { nombre: 'Arquitectura', id: 'INF004' },
    { nombre: 'base de datos', id: 'INF005' },
  ];


  ngOnInit() {}

}
