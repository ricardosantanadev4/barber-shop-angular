import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
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

  public listarClientesPaginados() {
    return this.daoService.get<IClient[]>(AppSettings.CLIENTES, DaoService.MEDIA_TYPE_APP_JSON);
  }
}