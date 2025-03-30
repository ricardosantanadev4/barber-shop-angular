import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../../../shared/services/client.service';
import { IClient } from '../../../shared/models/client.interface';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone'];
  clients: IClient[] = []; // Armazena os dados diretamente
  totalElements = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filter = '';
  constructor(private clientService: ClientService) { }

  ngAfterViewInit() {
    this.loadClientsPage();

    this.paginator.page.subscribe(() => this.loadClientsPage());
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadClientsPage();
    });
  }

  loadClientsPage() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortActive = this.sort.active;

    this.clientService.listarClientesPaginados(pageIndex, pageSize, this.filter).subscribe(response => {
      if (response.body) {
        this.clients = response.body.content;
        this.totalElements = response.body.totalElements;

        // Ajustar o paginator corretamente
        this.paginator.length = this.totalElements;
      }
    });
  }
}