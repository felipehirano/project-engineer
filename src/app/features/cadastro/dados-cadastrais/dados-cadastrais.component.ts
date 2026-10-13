
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dados-cadastrais',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './dados-cadastrais.component.html',
  styleUrl: './dados-cadastrais.component.scss'
})
export class DadosCadastraisComponent {
  arquivoSelecionado: File | null = null;
  erroArquivo = '';
  enviando = false;

  formulario;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.fb.nonNullable.group({
      cnpj: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9./-]{14,18}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      telefone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9()+\s-]{10,20}$/)
      ]]
    });
  }

  selecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    this.erroArquivo = '';
    this.arquivoSelecionado = null;

    if (!arquivo) return;

    const formatosPermitidos = [
      'application/pdf',
      'image/jpeg',
      'image/png'
    ];

    if (!formatosPermitidos.includes(arquivo.type)) {
      this.erroArquivo = 'Envie um PDF, JPG ou PNG.';
      input.value = '';
      return;
    }

    if (arquivo.size > 10 * 1024 * 1024) {
      this.erroArquivo = 'O arquivo deve ter no máximo 10 MB.';
      input.value = '';
      return;
    }

    this.arquivoSelecionado = arquivo;
  }

  continuar(): void {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid || !this.arquivoSelecionado) {
      return;
    }

    // Nesta etapa, os dados ainda não são enviados ao servidor.
    this.enviando = true;

    this.router.navigate(['/cadastro/documento']);
  }
}
