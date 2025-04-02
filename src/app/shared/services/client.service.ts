import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { IClientPage } from '../models/client-page.interface';
import { IClient } from '../models/client.interface';
import { DaoService } from './dao.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private daoService: DaoService,
    // private http: HttpClient,
    // private state: AppState,
  ) { }

  public createClient(cliente: IClient) {
    return this.daoService.post<IClient>(`${AppSettings.CLIENTES}/criar`, cliente, DaoService.MEDIA_TYPE_APP_JSON);
  }

  public listarClientesPaginados(pageIndex?: number, pageSize?: number, filter?: string) {
    return this.daoService.get<IClientPage>(`${AppSettings.CLIENTES}?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`, DaoService.MEDIA_TYPE_APP_JSON);
  }
}