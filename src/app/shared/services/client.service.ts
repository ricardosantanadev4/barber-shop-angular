import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { DaoService } from './dao.service';
import { IClientPage } from '../models/client-page.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private daoService: DaoService,
    // private http: HttpClient,
    // private state: AppState,
  ) { }

  public listarClientesPaginados(pageIndex?: number, pageSize?: number, filter?: string) {
    return this.daoService.get<IClientPage>(`${AppSettings.CLIENTES}?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`, DaoService.MEDIA_TYPE_APP_JSON);
  }
}