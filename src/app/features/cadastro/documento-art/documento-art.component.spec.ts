import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoArtComponent } from './documento-art.component';

describe('DocumentoArtComponent', () => {
  let component: DocumentoArtComponent;
  let fixture: ComponentFixture<DocumentoArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoArtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentoArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
