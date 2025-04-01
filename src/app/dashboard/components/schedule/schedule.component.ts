import { Component, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { add, format, parse } from 'date-fns';
import { IClient } from '../../../shared/models/client.interface';
import { ClientService } from '../../../shared/services/client.service';
import { ScheduleService } from '../../../shared/services/schedule.service';

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

  scheduleForm!: FormGroup;
  startTimes: string[] = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  endTimes: string[] = [];
  clients!: IClient[];
  selected = model<Date | null>(null);
  selectedStartTime: string | null = null;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService,
    private scheduleService: ScheduleService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadClients();
  }

  initForm() {
    this.scheduleForm = this.formBuilder.group({
      inicio: ['', [Validators.required]],
      fim: ['', [Validators.required]],
      data: [this.selected, [Validators.required]],
      cliente: ['', Validators.required],
    })
  }

  loadClients() {
    this.clientService.listarClientesPaginados(0, 10, '').subscribe(response => {
      if (response.body) {
        this.clients = response.body.content;
      }
    })
  }

  onStartTimeChange(startTime: string) {
    if (startTime) {
      this.selectedStartTime = startTime;

      // Converte string para Date
      const startDate = parse(startTime, 'HH:mm', new Date());

      // Adiciona 1 hora para determinar o horário final disponível
      const endDate = add(startDate, { hours: 1 });

      // Formata para 'HH:mm' e define no segundo select
      this.endTimes = [format(endDate, 'HH:mm')];

      // Limpa a seleção anterior do fim, caso tenha sido feita antes
      this.scheduleForm.patchValue({ fim: '' });
    }
  }

  createSchedule() {
    const formattedDate = this.formattDataValueToyyyyMMdd();
    this.setDataForm(formattedDate);
    if (this.scheduleForm.valid) {
      this.scheduleService.createSchedule(this.scheduleForm.value).subscribe();
    }

  }

  formattDataValueToyyyyMMdd() {
    const dataValue = this.selected();
    if (dataValue) {
      const formattedDate = format(dataValue, 'yyyy-MM-dd');
      return formattedDate;
    } else {
      return '';
    }
  }

  setDataForm(formattedDate: string) {
    this.scheduleForm.setValue({
      inicio: this.scheduleForm.get('inicio')?.value,
      fim: this.scheduleForm.get('fim')?.value,
      data: formattedDate,
      cliente: this.scheduleForm.get('cliente')?.value,
    });
  }

}