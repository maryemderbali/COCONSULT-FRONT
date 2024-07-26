import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagequestionComponent } from './affichagequestion.component';

describe('AffichagequestionComponent', () => {
  let component: AffichagequestionComponent;
  let fixture: ComponentFixture<AffichagequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichagequestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichagequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
