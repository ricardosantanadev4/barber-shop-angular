import { Component } from '@angular/core';
import { ScheduleTableComponent } from '../schedule-table/schedule-table.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-schedule-panel',
  standalone: true,
  imports: [ScheduleComponent, ScheduleTableComponent],
  templateUrl: './schedule-panel.component.html',
  styleUrl: './schedule-panel.component.scss'
})
export class SchedulePanelComponent {

}
