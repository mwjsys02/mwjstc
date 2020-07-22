import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import * as Query from './graph-ql/queries';

export class Trans {
  cday:Date;
  sday:Date;
  ttype:String;
  denno:number;
  mline:number;
  biko:String;
  tcode:String;
  yday:Date;
  aitec:number;
  aiten:String;
  insuu:number;
  ousuu:number;
  zaisu:number;
  constructor(init?:Partial<Trans>) {
      Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TransService {

  public tbldata:Trans[]=[];
  public flg:number=1;
  //コンポーネント間通信用
  subject = new Subject<string>();
  observe = this.subject.asObservable();

  constructor(private apollo: Apollo) { 

  }
  reset_Trans(): void{
    this.tbldata=[];
  }
  set_tblData(tbltrans:any): void{
    let wCday:Date;
    let wInsu:number;
    let wOusu:number;
    if ( tbltrans.sday !== '2000-01-01' ) { 
      wCday = tbltrans.sday;
    }else if ( tbltrans.yday !== '2000-01-01' ) { 
      wCday = tbltrans.yday;
    }else {
      wCday = new Date('2099-12-31');
    }
    if ( tbltrans.denku == 1 ) { 
      wInsu = tbltrans.suu;
      wOusu = 0;
    }else{ 
      wInsu = 0;
      wOusu = tbltrans.suu;
    }
    const wTran:Trans = {...tbltrans, ...{ cday: wCday, insuu: wInsu, ousuu: wOusu ,zaisu:0}};    
    this.tbldata.push(wTran);
  }
  get_tblData(): Observable<Trans[]> {

    this.tbldata.sort(function(a, b) {
      if (a.cday > b.cday) {
        return 1;
      } else {
        return -1;
      } 
    })
    let wGenz:number=0;
    for (let i=0; i < this.tbldata.length; i++ ){
      wGenz += this.tbldata[i].insuu - this.tbldata[i].ousuu;
      this.tbldata[i].zaisu = wGenz;
    }
    if (this.flg==-1) {
        this.tbldata.sort(function(a, b) {
        if (a.cday < b.cday) {
          return 1;
        } else {
          return -1;
        } 
      })
    }
    return of(this.tbldata);
  }  
}

