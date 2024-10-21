import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  httpClient = inject(HttpClient);

  constructor() { }

  request(type: 'POST' | 'GET' | 'PUT' | 'DELETE', url: string, path: string = '', body: any = {}) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      // Construcción de la URL, solo agregar 'path' si no está vacío
      const fullUrl = path ? `${url}/${path}` : url;

      if (type === 'POST') {
        this.httpClient.post(fullUrl, body, { headers }).subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err)
        });
      }

      if (type === 'GET') {
        this.httpClient.get(fullUrl, { headers }).subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err)
        });
      }

      if (type === 'PUT') {
        this.httpClient.put(fullUrl, body, { headers }).subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err)
        });
      }

      if (type === 'DELETE') {
        this.httpClient.delete(fullUrl, { headers }).subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err)
        });
      }
    });
  }
}
