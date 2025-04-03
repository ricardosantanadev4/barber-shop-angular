import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { clientResolver } from '../shared/resolvers/client.resolver';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { FixedLayoutComponent } from './components/fixed-layout/fixed-layout.component';
import { SchedulePanelComponent } from './components/schedule-panel/schedule-panel.component';

const routes: Routes = [
  {
    path: '', component: FixedLayoutComponent, children: [
      { path: 'schedule-painel', component: SchedulePanelComponent, data: { title: 'Agendamentos' } },
      { path: 'client-detail', component: ClientFormComponent, data: { title: 'Cadastrar Cliente' } },
      {
        path: 'client-detail/:id', component: ClientFormComponent, data: { title: 'Editar Cliente' },
        resolve: { client: clientResolver }
      },
      { path: 'client-list', component: ClientTableComponent, data: { title: 'Clientes Cadastrados' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}
