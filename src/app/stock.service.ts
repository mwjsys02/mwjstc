import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import * as Query from './graph-ql/queries';

export interface Stock {
    htzan:number,
    juzan:number,
    stock:number,
    sct01:number,
    sct02:number,
    sct03:number,
    sct04:number,
    sct05:number,
    sct06:number,
    sct07:number,
    sct08:number,
    sct09:number,
    sct10:number,
    sct11:number,
    sct12:number
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  public stock:Stock ={
    htzan:0,
    juzan:0,
    stock:0,
    sct01:0,
    sct02:0,
    sct03:0,
    sct04:0,
    sct05:0,
    sct06:0,
    sct07:0,
    sct08:0,
    sct09:0,
    sct10:0,
    sct11:0,
    sct12:0
  };
  private gcode: string="";
  private scode: string="";
  
  public subject = new Subject<Stock>();
  public observe = this.subject.asObservable();
  
  constructor(private apollo: Apollo) {
    // console.log("constructor",this.stock);
  }

  get_Stock(pgcode:string,pscode:string):Stock {
    // console.log("pgcode",pgcode)
    // console.log("gcode",this.gcode)
    // if( pgcode != this.gcode || pscode != this.scode ){ 
      this.apollo.watchQuery<any>({
        query: Query.GetQuery3,
        variables: { 
          gcode : pgcode ,
          scode : pscode
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          // console.log("Query",data.tblstock);
          this.stock = data.tblstock[0];
          // console.log("Queryp",pgcode);
          this.gcode = pgcode;
          // console.log("Queryg",this.gcode);
          this.scode = pscode;
          // console.log("Query",this.stock)
        });
    // }
    // console.log("return",this.stock)
    return this.stock;
  }
}
