import { Component, model, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IClient } from '../../../shared/models/client.interface';
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule,
    MatDatepickerModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {

  startTimes: string[] = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  endTimes: string[] = ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00', '18:00'];

  clients!: IClient[];

  selected = model<Date | null>(null);

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.loadClients();
  }


  loadClients() {
    this.clientService.listarClientesPaginados(0, 10, '').subscribe(response => {
      if (response.body) {
        this.clients = response.body.content;
        console.log((`Clients: ${response.body}`));
      }
    })
  }
}

