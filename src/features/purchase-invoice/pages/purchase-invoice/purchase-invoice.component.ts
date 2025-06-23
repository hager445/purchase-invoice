import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SuppliersComponent } from '../../components/suppliers/suppliers.component';
import { TableComponent } from '../../components/table/table.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-invoice-purchase',
  imports: [HeaderComponent,SuppliersComponent,TableComponent,FooterComponent],
  templateUrl: './purchase-invoice.component.html',
  styleUrl: './purchase-invoice.component.css'
})
export class InvoicePurchaseComponent {

}
