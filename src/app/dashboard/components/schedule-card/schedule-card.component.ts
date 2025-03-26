import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-schedule-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './schedule-card.component.html',
  styleUrl: './schedule-card.component.scss',
})
export class ScheduleCardComponent {

}
