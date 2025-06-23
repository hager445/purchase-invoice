import { Injectable, signal } from '@angular/core';
import { IInvoiceItem } from '../../../../core/interfaces/invoice/iinvoice';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  invoiceArray = signal<IInvoiceItem[]>([])
  totalPrice = signal<number>(0);
  // totalPrice = signal<number>(0);
 
  constructor() { }
  measureTotalPrice(){
    let total = 0
    this.invoiceArray().forEach(element => {
       total += element.total;
    });
    this.totalPrice.set(total); 
  }
 
}
