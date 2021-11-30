import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Consulta } from '../_model/consulta';
import { ConsultaListaExamenDTO } from 'src/app/_model/consultaListaExamenDTO';
import { FiltroConsultaDTO } from '../_model/filtroConsultaDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url: string = `${environment.HOST}/consultas`;

  constructor(
    private http: HttpClient
  ) { }

  registrarTransaccion(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }

  buscarFecha(fecha: string) {
    return this.http.get<Consulta[]>(`${this.url}/buscar?fecha=${fecha}`);
    /*{
      params: { 'fecha' : fecha}
    }*/
  }

  buscarOtros(filtroConsulta: FiltroConsultaDTO) {
    return this.http.post<Consulta[]>(`${this.url}/buscar/otros`, filtroConsulta);
  }

  listarExamenPorConsulta(idConsulta: number) {
    return this.http.get<ConsultaListaExamenDTO[]>(`${environment.HOST}/consultaexamenes/${idConsulta}`);
  }

  listarResumen() {
    return this.http.get<any[]>(`${environment.HOST}/consultas/listarResumen`);
  }

  generarReporte() {
    return this.http.get(`${environment.HOST}/consultas/generarReporte`, {
      responseType: 'blob'
    });
  }

  subirArchivo(data: File) {
    let formdata: FormData = new FormData;
    formdata.append('adjunto', data)
    return this.http.post(`${this.url}/guardarArchivo`, formdata);
  }

  leerArchivo() {
    return this.http.get(`${environment.HOST}/consultas/leerArchivo/1`, {
      responseType: 'blob'
    });
  }

  

}
