import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePurchaseComponent } from './purchase-invoice.component';

describe('InvoicePurchaseComponent', () => {
  let component: InvoicePurchaseComponent;
  let fixture: ComponentFixture<InvoicePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicePurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
