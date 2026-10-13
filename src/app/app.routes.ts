import { Routes } from '@angular/router';

import { CategoriaComponent } from './features/cadastro/categoria/categoria.component';
import { DadosCadastraisComponent } from './features/cadastro/dados-cadastrais/dados-cadastrais.component';
import { DocumentoArtComponent } from './features/cadastro/documento-art/documento-art.component';
import { EspecialidadesComponent } from './features/cadastro/especialidades/especialidades.component';
import { RevisaoComponent } from './features/cadastro/revisao/revisao.component';
import { FilaRevisaoComponent } from './features/administracao/fila-revisao/fila-revisao.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastro/categoria', pathMatch: 'full' },
  { path: 'cadastro/categoria', component: CategoriaComponent },
  { path: 'cadastro/dados', component: DadosCadastraisComponent },
  { path: 'cadastro/documento', component: DocumentoArtComponent },
  { path: 'cadastro/especialidades', component: EspecialidadesComponent },
  { path: 'cadastro/revisao', component: RevisaoComponent },
  { path: 'administracao/revisao', component: FilaRevisaoComponent },
  { path: '**', redirectTo: 'cadastro/categoria' }
];
