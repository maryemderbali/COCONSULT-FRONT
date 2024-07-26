import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGPCHATComponent } from './card-gpchat.component';

describe('CardGPCHATComponent', () => {
  let component: CardGPCHATComponent;
  let fixture: ComponentFixture<CardGPCHATComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardGPCHATComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGPCHATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
