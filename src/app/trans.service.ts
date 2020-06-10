import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import * as Query from './graph-ql/queries';
// import { Trans} from './classes/trans';

// export interface ITrans {
//         sday:Date;
//         ttype:String;
//         denno:number;
//         mline:number;
//         suu:number;
//         biko:String;
//         tcode:String;
//         denku:number;
//         yday:Date;
//         aitec:number;
//         aiten:String;
//         cday:Date;
// }

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

  //コンポーネント間通信用
  subject = new Subject<string>();
  observe = this.subject.asObservable();

  constructor(private apollo: Apollo) { 

  }
  // get_Trans(gcode:string,scode:string):Trans[] {
  //   console.log("query前",gcode);
  //   // console.log(!this.gcode,!this.scode);
  //   // if ( gcode && scode ) {
  //   this.apollo.watchQuery<any>({
  //     query: Query.GetQuery4,
  //     variables: { 
  //       gcode : gcode ,
  //       scode : scode
  //       },
  //     })
  //     .valueChanges
  //     .subscribe(({ data }) => {
  //       // var tdata:Trans[] = new Trans();
  //       // console.log("get_tran前",this.tbldata);
        
  //       // this.tbldata = data.tbltrans;
  //       // if (data.tbltrans.sday) {
  //       //   this.tbldata.cday = data.tbltrans.sday;
  //       // } else if (data.tbltrans.yday) { 
  //       //   this.tbldata.cday = data.tbltrans.yday; 
  //       // }
  //       // console.log("get_tran",data.tbltrans);
  //       // console.log("get_tran",this.tbldata);
  //       this.tbldata=[];
  //       for (let i=0; i < data.tbltrans.length; i++ ){
  //         let wCday:Date;
  //         let wInsu:number;
  //         let wOusu:number;
  //         if ( data.tbltrans[i].sday !== '2000-01-01' ) { 
  //           wCday = data.tbltrans[i].sday;
  //         }else{ 
  //           wCday = data.tbltrans[i].yday;
  //         }
  //         if ( data.tbltrans[i].denku == 1 ) { 
  //           wInsu = data.tbltrans[i].suu;
  //           wOusu = 0;
  //         }else{ 
  //           wInsu = 0;
  //           wOusu = data.tbltrans[i].suu;
  //         }
  //         const wTran:Trans = {...data.tbltrans[i], ...{ cday: wCday, insuu: wInsu, ousuu: wOusu ,zaisu:0}};
  //         this.tbldata.push(wTran);
  //       }
  //       // console.log("sort前",this.tbldata);
  //       this.tbldata.sort(function(a, b) {
  //         if (a.cday > b.cday) {
  //           return 1;
  //         } else {
  //           return -1;
  //         }
  //       })
  //       // console.log("sort後",this.tbldata);
  //       // this.observe.next();
  //     });
  //   // }
  //   return this.tbldata;
  // }
  // get_tblTrans(gcode:string,scode:string): Observable<Trans[]> {
  //   this.apollo.watchQuery<any>({
  //     query: Query.GetQuery4,
  //     variables: { 
  //       gcode : gcode ,
  //       scode : scode
  //       },
  //     })
  //     .valueChanges
  //     .subscribe(({ data }) => {
  //       this.tbldata=[];
  //       for (let i=0; i < data.tbltrans.length; i++ ){
  //         let wCday:Date;
  //         let wInsu:number;
  //         let wOusu:number;
  //         if ( data.tbltrans[i].sday !== '2000-01-01' ) { 
  //           wCday = data.tbltrans[i].sday;
  //         }else{ 
  //           wCday = data.tbltrans[i].yday;
  //         }
  //         if ( data.tbltrans[i].denku == 1 ) { 
  //           wInsu = data.tbltrans[i].suu;
  //           wOusu = 0;
  //         }else{ 
  //           wInsu = 0;
  //           wOusu = data.tbltrans[i].suu;
  //         }
  //         const wTran:Trans = {...data.tbltrans[i], ...{ cday: wCday, insuu: wInsu, ousuu: wOusu ,zaisu:0}};
  //         this.tbldata.push(wTran);
  //       }
  //       this.tbldata.sort(function(a, b) {
  //         if (a.cday > b.cday) {
  //           return 1;
  //         } else {
  //           return -1;
  //         }
  //       })
  //     });
  //   return of(this.tbldata);
  // }
  reset_Trans(): void{
    this.tbldata=[];
  }
  set_tblData(tbltrans:any): void{
    let wCday:Date;
    let wInsu:number;
    let wOusu:number;
    if ( tbltrans.sday !== '2000-01-01' ) { 
      wCday = tbltrans.sday;
    }else{ 
      wCday = tbltrans.yday;
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
    return of(this.tbldata);
  }  
}

