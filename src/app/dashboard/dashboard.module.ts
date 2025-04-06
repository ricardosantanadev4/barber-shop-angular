import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from '../paginator-intl-pt';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }
  ]
})
export class DashboardModule { }
