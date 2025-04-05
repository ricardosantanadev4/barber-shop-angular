import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, delay, finalize } from 'rxjs';
import Swal from 'sweetalert2';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  // const usuarioService = inject(UsuarioService);

  Swal.fire({
    title: 'Carregando...',
    background: '#F5F7F9',
    color: '#192531',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
      // Seleciona o spinner e aplica o estilo diretamente
      const style = document.createElement('style');
      style.innerHTML = `
      .swal2-container .swal2-loader {
        border-color: #192531 #D8DAD9 #192531 #192531;
      }
    `;
      document.head.appendChild(style);
    }
  });

  return next(req).pipe(
    delay(300),
    catchError((error) => {
      console.error('Erro na requisição:', error);

      // Exibe um alerta de erro que só fecha ao clicar em "OK"
      Swal.fire({
        title: 'Erro!',
        text: 'Ocorreu um problema durante a requisição.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: "#192531",
      });

      throw error; // Repassa o erro para outros manipuladores
    }),
    finalize(() => {
      // Fecha apenas se não houver erro
      if (Swal.isVisible() && Swal.getTitle()?.textContent === 'Carregando...') {
        Swal.close();
      }
    })
  );

};
