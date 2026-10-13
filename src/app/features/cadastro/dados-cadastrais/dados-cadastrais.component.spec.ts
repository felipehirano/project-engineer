import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastraisComponent } from './dados-cadastrais.component';

describe('DadosCadastraisComponent', () => {
  let component: DadosCadastraisComponent;
  let fixture: ComponentFixture<DadosCadastraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosCadastraisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosCadastraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
