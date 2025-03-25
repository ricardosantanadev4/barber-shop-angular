import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedLayoutComponent } from './components/fixed-layout/fixed-layout.component';
import { SchedulePanelComponent } from './components/schedule-panel/schedule-panel.component';

const routes: Routes = [
  {
    path: '', component: FixedLayoutComponent, children: [
      { path: 'schedule-painel', component: SchedulePanelComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}
