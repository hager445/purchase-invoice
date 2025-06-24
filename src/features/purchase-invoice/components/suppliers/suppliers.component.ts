import { Component, effect, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; 
import { MatIconModule } from '@angular/material/icon'; 
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { Isupplier } from '../../../../core/interfaces/suppliers/isupplier';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { IInvoiceMetaData } from '../../../../core/interfaces/invoice/iinvoice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-suppliers',
  providers:[provideNativeDateAdapter()],
  imports: [    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent {
  invoiceMetaData:IInvoiceMetaData = {} as IInvoiceMetaData;
  suppliers:Isupplier[]=[];
  supplierInfo=signal<Isupplier>({} as Isupplier);
  metaDataForm!:FormGroup;
  constructor(private _Suppliers:SuppliersService , private _Fb:FormBuilder){
    effect(()=>{
      if (_Suppliers.startNewInvoice()) {
        this.metaDataForm.reset()
      }
    })
  }
  ngOnInit(): void {
    this.getSuppliers();
    this.metaDataForm = this._Fb.group({
      'id':[''],
      'invoiceDate':['',Validators.required],
      'supplierId':['',Validators.required],
      'notes':['',Validators.required],
    })
  }
getSuppliers(){
this._Suppliers.getSuppliers().subscribe({next:(res)=>{
  this.suppliers = res;
  console.log(this.suppliers);
  
}})
}
// ===============
getSupplierInfo(selectedId:number){
  console.log(selectedId);
    this.suppliers.forEach(supplier => {
      if (supplier.id === selectedId) {
        this.supplierInfo.set(supplier);
        console.log(this.supplierInfo());
      }
    });
  
}
updateMetaData(){
this.invoiceMetaData = this.metaDataForm.value;
this._Suppliers.updataMetaData(this.invoiceMetaData);
if (this.metaDataForm.valid) {
  this._Suppliers.metaDataFormIsvalid.set(true);
}
}
}
