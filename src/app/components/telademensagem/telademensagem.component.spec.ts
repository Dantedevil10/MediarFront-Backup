import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelademensagemComponent } from './telademensagem.component';

describe('TelademensagemComponent', () => {
  let component: TelademensagemComponent;
  let fixture: ComponentFixture<TelademensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelademensagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelademensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
