import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { format, isValid, parse } from 'date-fns';
import { ISchedule } from '../../../shared/models/schedule.interface';
import { ScheduleService } from '../../../shared/services/schedule.service';

@Component({
  selector: 'app-schedule-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, DatePipe],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.scss'
})
export class ScheduleTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'inicio', 'termino', 'date', 'cliente'];
  shedules: ISchedule[] = []; // Armazena os dados diretamente
  totalElements = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  inputValue = '';
  filter = '';
  constructor(private scheduleService: ScheduleService) { }

  ngAfterViewInit() {
    this.loadSchedulesPage();

    this.paginator.page.subscribe(() => this.loadSchedulesPage());
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadSchedulesPage();
    });
  }

  loadSchedulesPage() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortActive = this.sort.active;

    this.filter = this.formatDateStrToyyyyMMdd(this.inputValue);

    this.scheduleService.agendamentosPaginados(pageIndex, pageSize, this.filter).subscribe(response => {
      if (response.body) {
        this.shedules = response.body.content;
        this.totalElements = response.body.totalElements;

        // Ajustar o paginator corretamente
        this.paginator.length = this.totalElements;
      }
    });
  }

  formatDateStrToyyyyMMdd(inputValue: string) {
    const parseDate = parse(this.inputValue, 'dd-MM-yyyy', new Date());
    if (isValid(parseDate) && format(parseDate, 'dd-MM-yyyy') === this.inputValue) {
      const parseDbDate = format(parseDate, 'yyyy-MM-dd');
      return parseDbDate;
    } else {
      return this.inputValue;
    }
  }

}