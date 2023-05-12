import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Persona {
  idpersona: number;
  nombres: string;
  apepaterno: string;
  apematerno: string;
  documento: string;
  fechanacimiento: string;
  email: string;
  direccion: string;
  idregion: number;
  idprovincia: number;
  iddistrito: number;
}

@Component({
  selector: 'app-root',
  template: `
    <h1>Personas</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Nombres</th>
        <th>Apellido Paterno</th>
        <th>Apellido Materno</th>
        <th>Documento</th>
        <th>Fecha de Nacimiento</th>
        <th>Email</th>
        <th>Dirección</th>
        <th>ID Región</th>
        <th>ID Provincia</th>
        <th>ID Distrito</th>
        <th>Actions</th>
      </tr>
      <tr *ngFor="let persona of personas">
        <td>{{ persona.idpersona }}</td>
        <td>{{ persona.nombres }}</td>
        <td>{{ persona.apepaterno }}</td>
        <td>{{ persona.apematerno }}</td>
        <td>{{ persona.documento }}</td>
        <td>{{ persona.fechanacimiento }}</td>
        <td>{{ persona.email }}</td>
        <td>{{ persona.direccion }}</td>
        <td>{{ persona.idregion }}</td>
        <td>{{ persona.idprovincia }}</td>
        <td>{{ persona.iddistrito }}</td>
        <td>
          <button (click)="updatePersona(persona.idpersona)">Update</button>
          <button (click)="deletePersona(persona.idpersona)">Delete</button>
        </td>
      </tr>
    </table>

    <!-- Add Persona form goes here -->
  `,
})
export class AppComponent {
  personas: Persona[] = [];

  // Update this value with the URL of your Node.js backend
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.getPersonas();
  }

  async getPersonas() {
    this.personas = await this.http.get<Persona[]>(`${this.baseUrl}/personas`).toPromise() as Persona[];
  }

  async addPersona(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const nombres = formData.get('nombres') as string;
    const apepaterno = formData.get('apepaterno') as string;
    const apematerno = formData.get('apematerno') as string;
    const documento = formData.get('documento') as string;
    const fechanacimiento = formData.get('fechanacimiento') as string;
    const email = formData.get('email') as string;
    const direccion = formData.get('direccion') as string;
    const idregion = Number(formData.get('idregion'));
    const idprovincia = Number(formData.get('idprovincia'));
    const iddistrito = Number(formData.get('iddistrito'));

    await this.http.post(`${this.baseUrl}/personas`, { nombres, apepaterno, apematerno ,documento ,fechanacimiento ,email ,direccion ,idregion ,idprovincia ,iddistrito}).toPromise();

    form.reset();

    this.getPersonas();
  }

  async updatePersona(idpersona: number) {
    // Update logic goes here
  }

  async deletePersona(idpersona: number) {
    await this.http.delete(`${this.baseUrl}/personas/${idpersona}`).toPromise();

    this.getPersonas();
  }
}
