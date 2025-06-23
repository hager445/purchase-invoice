import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoiceMetaData } from '../../../../core/interfaces/invoice/iinvoice';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService { 
    metaDataFormIsvalid=signal<boolean>(false)
   metaData=signal<IInvoiceMetaData>({} as IInvoiceMetaData)
   startNewInvoice=signal<boolean>(false);
  constructor(private _Http:HttpClient) { }
   getSuppliers():Observable<any>{
      return this._Http.get(`http://localhost:3000/suppliers`)
    }
    updataMetaData(invoiceMetaData:IInvoiceMetaData){
     this.metaData.set(invoiceMetaData);
    }
}
