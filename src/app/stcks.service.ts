import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';


export class Stcks {
  irisu:number;
  gcode:string;
  stock:number;
  juzan:number;
  htzan:number;
  ndate:Date;
  incnt:number;
  able:number;
  constructor(init?:Partial<Stcks>) {
      Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class StcksService {

  public tbldata:Stcks[]=[];
  public paabl:number = 0;
  //コンポーネント間通信用
  subject = new Subject<string>();
  observe = this.subject.asObservable();

  constructor() { }

  reset_Stcks(): void{
    this.tbldata=[];
  }

  set_tblData(stdata:Stcks): void{
    this.tbldata.push(stdata);
  }

  get_tblData(): Observable<Stcks[]> {
    this.tbldata.sort(function(a, b) {
      if (a.gcode > b.gcode) {
        return 1;
      } else {
        return -1;
      }
    })
    return of(this.tbldata);
  }  

  get_paabl():number {
    let paabl:number=9999;
    for (let i=0; i < this.tbldata.length; i++ ){
      const wAble = Math.floor(this.tbldata[i].able / this.tbldata[i].irisu);
      if ( wAble < paabl ){
        paabl = wAble;
      }
    }
    return paabl;
  }

}
