import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { FixedLayoutComponent } from './components/fixed-layout/fixed-layout.component';
import { SchedulePanelComponent } from './components/schedule-panel/schedule-panel.component';

const routes: Routes = [
  {
    path: '', component: FixedLayoutComponent, children: [
      { path: 'schedule-painel', component: SchedulePanelComponent, data: { title: 'Agendamentos' } },
      { path: 'client-datail', component: ClientFormComponent, data: { title: 'Cadastrar Cliente' } },
      { path: 'client-list', component: ClientTableComponent, data: { title: 'Listar Clientes' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}
