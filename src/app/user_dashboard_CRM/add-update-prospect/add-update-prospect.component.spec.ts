import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProspectComponent } from './add-update-prospect.component';

describe('AddUpdateProspectComponent', () => {
  let component: AddUpdateProspectComponent;
  let fixture: ComponentFixture<AddUpdateProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateProspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
