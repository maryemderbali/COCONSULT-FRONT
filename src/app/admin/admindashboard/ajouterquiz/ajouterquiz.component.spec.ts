import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterquizComponent } from './ajouterquiz.component';

describe('AjouterquizComponent', () => {
  let component: AjouterquizComponent;
  let fixture: ComponentFixture<AjouterquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterquizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
