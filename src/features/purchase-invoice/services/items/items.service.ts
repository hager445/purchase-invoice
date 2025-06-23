import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private _Http:HttpClient) {}
  getItems():Observable<any>{
    return this._Http.get(`http://localhost:3000/items`);
  }

}
