import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoice } from '../../../../core/interfaces/invoice/iinvoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _Http:HttpClient) { }
  insertInvoice(invoice:IInvoice):Observable<any>{
    return this._Http.post(`http://localhost:3000/invoices`,invoice)
  }
}
