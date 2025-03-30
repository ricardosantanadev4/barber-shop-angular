import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { ISchedulePage } from '../models/schedule-page.interface';
import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

   constructor(
      private daoService: DaoService,
      // private http: HttpClient,
      // private state: AppState,
    ) { }
  
    public agendamentosPaginados(pageIndex?: number, pageSize?: number, filter?: string) {
      return this.daoService.get<ISchedulePage>(
        `${AppSettings.SCHEDULES}?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`,
        DaoService.MEDIA_TYPE_APP_JSON);
    }

}
