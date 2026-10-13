
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RevisaoService,
  StatusEspecialidade
} from '../../../core/services/revisao.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fila-revisao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fila-revisao.component.html',
  styleUrl: './fila-revisao.component.scss'
})
export class FilaRevisaoComponent {
  motivoPorItem: Record<string, string> = {};
  mensagem = '';

  constructor(public revisaoService: RevisaoService) {}

  get pedidos() {
    return this.revisaoService.listar();
  }

  decidir(
    pedidoId: string,
    itemId: string,
    decisao: StatusEspecialidade
  ): void {
    const pedido = this.pedidos.find(p => p.id === pedidoId);
    const item = pedido?.especialidades.find(e => e.id === itemId);

    if (!item) return;

    const motivo = (this.motivoPorItem[itemId] ?? '').trim();

    if (
      (decisao === 'rejeitada' || decisao === 'correcao_pedida') &&
      !motivo
    ) {
      this.mensagem =
        'Informe o motivo para rejeitar ou solicitar correção.';
      return;
    }

    this.revisaoService.decidir(
      pedidoId,
      itemId,
      decisao,
      motivo
    );

    this.mensagem = `Decisão registrada para ${item.especialidade}.`;
  }

  nomeStatus(status: StatusEspecialidade): string {
    const nomes: Record<StatusEspecialidade, string> = {
      em_analise: 'Em análise',
      aprovada: 'Aprovada',
      rejeitada: 'Rejeitada',
      correcao_pedida: 'Correção pedida'
    };

    return nomes[status];
  }
}
