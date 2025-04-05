import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  confirmButtonColor = "#192531";
  background = '#F5F7F9';
  color = '#192531';
  cancelButtonColor = '#D8DAD9';

  constructor() { }

  showError(message: string, title: string = 'Erro') {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: this.confirmButtonColor,
      background: this.background,
      color: this.color,
    });
  }

  showSuccess(message: string, title: string = 'Sucesso') {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: this.confirmButtonColor,
    });
  }

  showWarning(message: string, title: string = 'Atenção') {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: this.confirmButtonColor,
      cancelButtonColor: this.cancelButtonColor,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      reverseButtons: true
    })
  }
}