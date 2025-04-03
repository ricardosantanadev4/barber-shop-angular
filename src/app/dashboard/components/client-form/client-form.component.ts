import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { IClient } from '../../../shared/models/client.interface';
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  clientForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private route: ActivatedRoute) {
    const clientResolver: IClient = this.route.snapshot.data['client'];
    console.log(clientResolver);
    this.initForm(clientResolver);
  }

  initForm(clientResolver: IClient) {
    this.clientForm = this.formBuilder.group({
      id: [clientResolver?.id],
      nome: [clientResolver?.nome, [Validators.required]],
      email: [clientResolver?.email, [Validators.required, Validators.email]],
      telefone: [clientResolver?.telefone, [Validators.required]]
    })
  }

  getErrorMessageFromFormField(field: string) {
    switch (true) {
      case this.clientForm.get(field)?.hasError('required'):
        return `O ${field} é obrigatório`;

      case this.clientForm.get(field)?.hasError('email'):
        return `Fomato de ${field} inválido`;
      default:
        return '';
    }
  }

  createClient() {
    console.log('createClient()');
    if (this.clientForm.valid) {
      this.clientService.createClient(this.clientForm.value).pipe(
        catchError((error: HttpErrorResponse) => of(alert(error.error.message))),
      ).subscribe({
        next: () => {
          alert('Cliente cadastrado com sucesso!');
        }
      });
    }
  }
}
