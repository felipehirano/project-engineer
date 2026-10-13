
import { Injectable } from '@angular/core';

export type StatusEspecialidade =
  | 'em_analise'
  | 'aprovada'
  | 'rejeitada'
  | 'correcao_pedida';

export interface ItemRevisao {
  id: string;
  area: string;
  grupo: string;
  especialidade: string;
  atividade: string;
  status: StatusEspecialidade;
  motivo: string;
}

export interface PedidoRevisao {
  id: string;
  empresa: string;
  documento: string;
  numeroDocumento: string;
  profissional: string;
  data: string;
  atividadeTecnica: string;
  obra: string;
  arquivo: string;
  enviadoEm: string;
  especialidades: ItemRevisao[];
}

@Injectable({
  providedIn: 'root'
})
export class RevisaoService {
  private pedidos: PedidoRevisao[] = [];

  listar(): PedidoRevisao[] {
    return this.pedidos;
  }

  adicionar(pedido: PedidoRevisao): void {
    this.pedidos.unshift(pedido);
  }

  decidir(
    pedidoId: string,
    especialidadeId: string,
    status: StatusEspecialidade,
    motivo = ''
  ): void {
    const pedido = this.pedidos.find(p => p.id === pedidoId);
    const item = pedido?.especialidades.find(e => e.id === especialidadeId);

    if (!item) return;

    item.status = status;
    item.motivo = motivo;
  }

  contarPendentes(): number {
    return this.pedidos.reduce(
      (total, pedido) =>
        total + pedido.especialidades.filter(
          item => item.status === 'em_analise'
        ).length,
      0
    );
  }
}
