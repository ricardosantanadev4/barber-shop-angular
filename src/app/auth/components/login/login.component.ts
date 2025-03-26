import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    })
  }

  getErrorMessageFromFormField(field: string) {
    const getField = this.loginForm.get(field);
    switch (true) {
      case getField?.hasError('required'):
        return `O campo é obrigatório`;
        case getField?.hasError('email'):
          return `Email inválido.`;
      default:
        return '';
    }
  }

  navigateTo() {
    if (this.loginForm.valid) {
      this.router.navigate(['/schedule-painel']);
    }
  }

}
