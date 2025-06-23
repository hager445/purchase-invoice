import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:'invoice-purchase',pathMatch:'full'},
    { path:'invoice-purchase' , loadComponent:()=>import('../features/purchase-invoice/pages/purchase-invoice/purchase-invoice.component').then((c)=>c.InvoicePurchaseComponent)}
];
