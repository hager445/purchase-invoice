import { IInvoice } from './../../../../core/interfaces/invoice/iinvoice';
import { Component, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ItemsService } from '../../services/items/items.service';
import { IInvoiceItem, Iitems } from '../../../../core/interfaces/invoice/iinvoice';
import { SummaryComponent } from '../summary/summary.component';

import { InvoiceService } from '../../services/invoice/invoice.service';
import { SummaryService } from '../../services/summary/summary.service';
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-table',
  imports: [SummaryComponent,FormsModule,MatTableModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatSelectModule,MatOptionModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  displayedColumns = ['itemCode', 'itemName','price', 'quantity', 'total','action'];
  itemsCode:Iitems[]=[];
  // =====================================
  dataSource : FormGroup[] = [];
  mainForm!:FormGroup;
  newInvoice:IInvoice={}as IInvoice;
  metaDataFormIsvalid:boolean=false;
constructor(private fb:FormBuilder,private _Items:ItemsService , private _Invoices:InvoiceService,private _Summary:SummaryService , private _Supplier:SuppliersService , private _Toastr:ToastrService){
  effect(()=>{
    this.metaDataFormIsvalid = this._Supplier.metaDataFormIsvalid()
  })
}
// life cycles
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 
  this.getItemsCode();
  this.mainForm = this.fb.group({
    items:this.fb.array([])
  })
   this.insertNewRow();

  }


  // ============================



// ===================  get data
get formArray(): FormArray {
  return this.mainForm.get('items') as FormArray;
}

// ==================================
// handle http requests
getItemsCode(){
  this._Items.getItems().subscribe({
    next:(res)=>{
      this.itemsCode = res;
      console.log(res);
      
    }
  })
}
// ==================== set item name 
onItemCodeChange(itemCode:string , inputIndex:number){
this.itemsCode.forEach(item => {
  if (itemCode === item.code) {
   this.formArray.at(inputIndex).get('itemName')?.setValue(item.name);
   this.formArray.at(inputIndex).get('quantity')?.setValue(1);
  }
});
}
// ================= math operations
insertNewRow(){
  // create new form group : 
const row = this.createRowFormGroup();
(this.mainForm.get('items') as FormArray).push(row);
this.dataSource = [...this.formArray.controls as FormGroup[]]
}
measureItemTotalPrice(inputIndex:number){
const price = this.formArray.at(inputIndex).get('price')?.value;
const quantity = this.formArray.at(inputIndex).get('quantity')?.value;
const total =   price * quantity;
 this.formArray.at(inputIndex).get('total')?.setValue(total);
 this.sendFormArrayToMeasureTotalInvoice()
}
sendFormArrayToMeasureTotalInvoice(){
  this._Summary.invoiceArray.set(this.formArray.value);
  this._Summary.measureTotalPrice();
}
// ==========================
// ============= create operations 
// handle form
createRowFormGroup():FormGroup{
  return this.fb.group({
  itemCode: [''],
  itemName: [''],
  price: [''],
  quantity: [''],
  total: [''],

})
}
// ================================
createNewInvoice(){
if (this.mainForm.invalid) return;
this.deleteEmptyRowBeforeRequest();
this.setNewInvoiceToSend();
this._Invoices.insertInvoice(this.newInvoice).subscribe(
  {
next:(res)=>{
console.log(res);
this._Toastr.success('The Invoice is added successfuly!');

this.resetAll();
}}
)
this._Supplier.startNewInvoice.set(false);
}
setNewInvoiceToSend(){
  this.newInvoice = {
    metaData:this._Supplier.metaData(),
    items:this.formArray.value,
    grandTotal: this._Summary.totalPrice()
  }
}
// ====================== delete operations
deleteRow(rowIndex:number){
this.formArray.removeAt(rowIndex);
console.log(this.mainForm);
this.dataSource = [...this.formArray.controls as FormGroup[]]
}
deleteEmptyRowBeforeRequest(){
  const lastElementIndex = this.formArray.length-1;
  const formArray = this.formArray.at(lastElementIndex).value as IInvoiceItem;
  if (formArray.itemCode === '') {
   this.deleteRow(lastElementIndex)
  }
}
resetAll(){
this.mainForm.reset();
console.log(this.mainForm);
this.dataSource = [...[]];
this.formArray.clear();
this.insertNewRow();
// =====
this._Supplier.startNewInvoice.set(true);
}
}
