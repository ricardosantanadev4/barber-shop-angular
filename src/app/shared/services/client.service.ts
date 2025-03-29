import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { IClient } from '../models/client.interface';
import { DaoService } from './dao.service';
import { IClientPage } from '../models/clientpage.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private daoService: DaoService,
    // private http: HttpClient,
    // private state: AppState,
  ) { }

  public listarClientesPaginados(pageIndex?: number, pageSize?: number) {
    return this.daoService.get<IClientPage>(`${AppSettings.CLIENTES}?pageIndex=${pageIndex}&pageSize=${pageSize}`, DaoService.MEDIA_TYPE_APP_JSON);
  }
}