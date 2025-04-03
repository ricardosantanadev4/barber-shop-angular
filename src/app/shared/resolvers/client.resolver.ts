import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map, of } from 'rxjs';
import { IClient } from '../models/client.interface';
import { ClientService } from '../services/client.service';

export const clientResolver: ResolveFn<IClient> = (route, state) => {

  const clientService = inject(ClientService);

  if (route.params && route.params['id']) {
    return clientService.getClientById(route.params['id']).pipe(
      map((response: HttpResponse<IClient>) => response.body as IClient)
    );
  }

  return of({ id: 0, nome: '', email: '', telefone: '' });
};
