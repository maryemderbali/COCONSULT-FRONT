import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateContractComponent } from './add-update-contract.component';

describe('AddUpdateContractComponent', () => {
  let component: AddUpdateContractComponent;
  let fixture: ComponentFixture<AddUpdateContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
