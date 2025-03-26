import { Component } from '@angular/core';
import { ScheduleCardComponent } from '../schedule-card/schedule-card.component';
import { ScheduleTableComponent } from '../schedule-table/schedule-table.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-schedule-panel',
  standalone: true,
  imports: [ScheduleComponent, ScheduleTableComponent, ScheduleCardComponent],
  templateUrl: './schedule-panel.component.html',
  styleUrl: './schedule-panel.component.scss'
})
export class SchedulePanelComponent {

}
