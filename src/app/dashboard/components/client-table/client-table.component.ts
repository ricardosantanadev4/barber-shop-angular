import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IClient } from '../../../shared/models/client.interface';
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone'];
  dataSource: MatTableDataSource<IClient> = new MatTableDataSource<IClient>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Carregar os dados da API após a inicialização
    this.loadClientsPage();

    // Atualizar a página ao mudar o paginator ou o sort
    this.paginator.page.subscribe(() => this.loadClientsPage());
    this.sort.sortChange.subscribe(() => this.loadClientsPage());
  }

  loadClientsPage() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortActive = this.sort.active;

    this.clientService.listarClientesPaginados(pageIndex, pageSize).subscribe(response => {
      if (response.body) {
        this.dataSource.data = response.body.content;
        this.paginator.length = response.body.totalElements;

        // Habilitar/desabilitar o botão de próxima página
        if (response.body.number === response.body.totalPages - 1) {
          this.paginator.hasNextPage = () => false; // Não há próxima página
        } else {
          this.paginator.hasNextPage = () => true; // Há próxima página
        }

        // Habilitar/desabilitar o botão de voltar
        if (response.body.number === 0) {
          this.paginator.hasPreviousPage = () => false; // Não há página anterior
        } else {
          this.paginator.hasPreviousPage = () => true; // Há página anterior
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}