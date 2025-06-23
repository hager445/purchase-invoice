export interface IInvoice {
  metaData:IInvoiceMetaData,
  items: IInvoiceItem[];
  grandTotal: number;
}
export interface IInvoiceItem {
  itemCode: string;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}
export interface Iitems {
  id:number
  code: string;
  name: string;
  
}
export interface IInvoiceMetaData{
  id?: number; 
  invoiceDate: string; 
  supplierId?: string;
  notes?:string,
}