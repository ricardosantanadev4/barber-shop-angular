import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedLayoutComponent } from './components/fixed-layout/fixed-layout.component';

const routes: Routes = [
  { path: '', component: FixedLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}
