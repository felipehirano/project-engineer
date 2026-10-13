import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaRevisaoComponent } from './fila-revisao.component';

describe('FilaRevisaoComponent', () => {
  let component: FilaRevisaoComponent;
  let fixture: ComponentFixture<FilaRevisaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilaRevisaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilaRevisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
