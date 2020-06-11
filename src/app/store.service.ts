import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

export class Store {
  scode: string;
  sname: string;
  constructor(init?:Partial<Store>) {
    Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public tbldata:Store[]=[];
  //コンポーネント間通信用
  subject = new Subject<string>();
  observe = this.subject.asObservable();
  constructor() { }
  
  set_tblData(stdata:Store[]): void{
    this.tbldata = stdata;
  }

  get_tblData(): Store[] {
    return this.tbldata;
  }  

}
