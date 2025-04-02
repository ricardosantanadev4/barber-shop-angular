import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../../shared/services/client.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.initForm();
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]]
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
