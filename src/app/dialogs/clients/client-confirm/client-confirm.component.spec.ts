import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfirmComponent } from './client-confirm.component';

describe('ClientConfirmComponent', () => {
  let component: ClientConfirmComponent;
  let fixture: ComponentFixture<ClientConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
