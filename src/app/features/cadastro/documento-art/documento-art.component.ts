import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {
  RevisaoService,
  PedidoRevisao,
} from '../../../core/services/revisao.service';

type TipoDocumento = 'ART' | 'CAT';

interface SugestaoEspecialidade {
  area: string;
  grupo: string;
  nome: string;
  atividade: string;
  selecionada: boolean;
}

@Component({
  selector: 'app-documento-art',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './documento-art.component.html',
  styleUrl: './documento-art.component.scss',
})
export class DocumentoArtComponent {
  arquivo: File | null = null;
  erroArquivo = '';
  enviado = false;
  mensagem = '';

  tiposAtividade = [
    'Projeto',
    'Execução',
    'Fiscalização',
    'Consultoria',
    'Laudo',
  ];

  formulario;

  sugestoes: SugestaoEspecialidade[] = [];

  constructor(
    private fb: FormBuilder,
    private revisaoService: RevisaoService,
    private router: Router,
  ) {
    this.formulario = this.fb.nonNullable.group({
      tipo: ['ART' as TipoDocumento, Validators.required],
      numero: ['', Validators.required],
      profissional: ['', Validators.required],
      data: ['', Validators.required],
      atividadeTecnica: ['', Validators.required],
      obra: ['', Validators.required],
    });
  }

  selecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    this.erroArquivo = '';
    this.arquivo = null;
    this.sugestoes = [];
    this.enviado = false;

    if (!arquivo) return;

    if (arquivo.type !== 'application/pdf') {
      this.erroArquivo = 'Selecione um documento PDF.';
      input.value = '';
      return;
    }

    if (arquivo.size > 10 * 1024 * 1024) {
      this.erroArquivo = 'O arquivo deve ter no máximo 10 MB.';
      input.value = '';
      return;
    }

    this.arquivo = arquivo;
    this.mensagem =
      'Arquivo recebido. Confira os dados abaixo e gere as sugestões.';
  }

  gerarSugestoes(): void {
    this.formulario.markAllAsTouched();

    if (!this.arquivo || this.formulario.invalid) {
      this.mensagem = 'Preencha os dados e selecione um PDF.';
      return;
    }

    const atividade =
      this.formulario.controls.atividadeTecnica.value.toLocaleLowerCase(
        'pt-BR',
      );

    const catalogo: SugestaoEspecialidade[] = [
      {
        area: 'Civil',
        grupo: 'Geotecnia e fundações',
        nome: 'Fundações profundas',
        atividade: 'Execução',
        selecionada: false,
      },
      {
        area: 'Civil',
        grupo: 'Geotecnia e fundações',
        nome: 'Contenções e muros de arrimo',
        atividade: 'Execução',
        selecionada: false,
      },
      {
        area: 'Civil',
        grupo: 'Estruturas',
        nome: 'Concreto armado',
        atividade: 'Projeto',
        selecionada: false,
      },
      {
        area: 'Civil',
        grupo: 'Edificações',
        nome: 'Obras residenciais',
        atividade: 'Execução',
        selecionada: false,
      },
      {
        area: 'Civil',
        grupo: 'Geotecnia e fundações',
        nome: 'Terraplenagem',
        atividade: 'Execução',
        selecionada: false,
      },
      {
        area: 'Civil',
        grupo: 'Reforma e patologia',
        nome: 'Impermeabilização',
        atividade: 'Execução',
        selecionada: false,
      },
    ];

    const palavrasChave: Record<string, string[]> = {
      'Fundações profundas': ['fundação profunda', 'estaca', 'estacas'],
      'Contenções e muros de arrimo': ['contenção', 'muro de arrimo'],
      'Concreto armado': ['concreto armado', 'estrutura de concreto'],
      'Obras residenciais': ['obra residencial', 'edificação residencial'],
      Terraplenagem: ['terraplenagem', 'movimentação de terra'],
      Impermeabilização: ['impermeabilização', 'impermeabilizar'],
    };

    this.sugestoes = catalogo.filter((item) => {
      const termos = palavrasChave[item.nome] ?? [];
      return termos.some((termo) => atividade.includes(termo));
    });

    if (this.sugestoes.length === 0) {
      this.sugestoes = catalogo.slice(0, 3);
    }

    this.mensagem =
      'Sugestões geradas. Confira cada especialidade antes de enviar para revisão.';
  }

  atualizarSelecao(
    especialidade: SugestaoEspecialidade,
    selecionada: boolean,
  ): void {
    especialidade.selecionada = selecionada;
    this.enviado = false;
  }

  enviarParaRevisao(): void {
    const selecionadas = this.sugestoes.filter((item) => item.selecionada);

    if (!this.arquivo || this.formulario.invalid) {
      this.mensagem = 'Confira o arquivo e os dados do documento.';
      return;
    }

    if (selecionadas.length === 0) {
      this.mensagem = 'Selecione ao menos uma especialidade.';
      return;
    }

    const dados = this.formulario.getRawValue();

    const pedido: PedidoRevisao = {
      id: crypto.randomUUID(),
      empresa: 'Empresa de Engenharia (protótipo)',
      documento: dados.tipo,
      numeroDocumento: dados.numero,
      profissional: dados.profissional,
      data: dados.data,
      atividadeTecnica: dados.atividadeTecnica,
      obra: dados.obra,
      arquivo: this.arquivo.name,
      enviadoEm: new Date().toLocaleString('pt-BR'),
      especialidades: selecionadas.map((item) => ({
        id: crypto.randomUUID(),
        area: item.area,
        grupo: item.grupo,
        especialidade: item.nome,
        atividade: item.atividade,
        status: 'em_analise',
        motivo: '',
      })),
    };

    this.revisaoService.adicionar(pedido);

    this.enviado = true;
    this.mensagem =
      'Pedido enviado para revisão administrativa. As especialidades continuam pendentes de aprovação.';
  }
}
