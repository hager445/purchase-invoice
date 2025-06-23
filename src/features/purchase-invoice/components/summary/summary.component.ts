import { Component, effect } from '@angular/core';
import { SummaryService } from '../../services/summary/summary.service';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
total:number=0;
 tax:number = 5/100;
 constructor(private _Summary : SummaryService){
  effect(()=>{
   this.getTotalPrice();
  })
}

getTotalPrice(){
  this.total = this._Summary.totalPrice();
}
}
