import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GcodeHelpComponent } from '../gcode-help/gcode-help.component';
import { TrantblComponent } from '../trantbl/trantbl.component';
import { StcstblComponent } from '../stcstbl/stcstbl.component';
import { TransService } from '../trans.service';
import { Stcks, StcksService } from '../stcks.service';
import { GoodsService } from '../goods.service';
// import { HttpClient } from '@angular/common/http';
import { StockService } from '../stock.service';
// import { Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import * as Query from '../graph-ql/queries';
// import * as fs from 'fs';
import * as json2csv from 'json2csv';

interface Store {
  scode: string;
  sname: string;
}
// interface ActiveXObject {
//   new(s: string): any;
// }
// declare const ActiveXObject: ActiveXObject;

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.scss']
})
export class ViewStockComponent implements OnInit {
  public placehold: string;
  public stores:Store[]=[];
  public scode: string="";
  public gcode: string="";
  public sukbn: string="";
  public gname: string="";
  public stock: number=0;
  public juzan: number=0;
  public ndate: Date;
  public incnt: number=0;
  public htzan: number=0;
  public moavg: number=0;
  // public scdbk: string="";
  // public gcdbk: string="";
  @ViewChild(TrantblComponent,{static: false})
　private trncomp:TrantblComponent;
  @ViewChild(StcstblComponent,{static: false})
  private stscomp:StcstblComponent;   
  constructor(private gdssrv: GoodsService,
              private stcsrv: StockService,
              public stssrv: StcksService,
              private trnsrv: TransService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private elementRef: ElementRef,
              // private http: HttpClient,
              private apollo: Apollo) { }

  ngOnInit(): void {
    this.placehold = '倉庫読込中';
    this.scode = '01';
    this.get_Store();
    this.gdssrv.get_Goods();
    // this.stcsrv.observe.subscribe();
    // this.route.params.subscribe((params: Params)=>{
    //     this.gcode= params["gcd"];
    //     this.scode= '01' ;
    //     refresh();
    //   }
    //   ,
    //   err => {
    //     this.gcode= '' ;
    //   });
    this.trnsrv.observe.subscribe();

    if (typeof this.route.snapshot.params.gcd != "undefined") {
      this.gcode= this.route.snapshot.params.gcd.toUpperCase();
      this.scode= this.route.snapshot.params.scd;
      // console.log(this.gcode,this.scode);
      // console.log(this.stcsrv.get_Stock(this.gcode,this.scode));
      // this.stock = this.stcsrv.get_Stock(this.gcode,this.scode).stock;
      // this.juzan = this.stcsrv.get_Stock(this.gcode,this.scode).juzan;
      // this.htzan = this.stcsrv.get_Stock(this.gcode,this.scode).htzan;
      // this.stcsrv.subject.next(this.stcsrv.stock);
      this.refresh();
    }
    
  }

  contxtMenu(){
    this.gcdHelp();
    return false;
  }

  gcdHelp(): void {
    let dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    dialogConfig.data = {
        filter: this.gcode
    };
    // console.log("opendialog",dialogConfig);
    
    let dialogRef = this.dialog.open(GcodeHelpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      // data=>this.gcode=data);
      data=>{
          // console.log(data);
          if(typeof data != 'undefined'){
            this.gcode = data.gcode;
            this.gname = data.gname;
            this.sukbn = data.sukbn;
          }
          this.refresh();
      }
    );

  }
  setGname():void{
    // console.log(this.gcode);
    
    let i:number = this.gdssrv.get_Goods().findIndex(obj => obj.gcode == this.gcode.toUpperCase());
    // console.log(i,this.gdssrv.get_Goods());
    if(i > -1){
      this.gname = this.gdssrv.get_Goods()[i].gname;
      this.sukbn = this.gdssrv.get_Goods()[i].sukbn;
    } else {
      this.gname = '商品コード未登録';
    }
  }
  get_Store():Store[] {
    // this.goods=["NG23-S-WH","NG20-S-WH"];
    if (this.stores.length == 0) {
      this.apollo.watchQuery<any>({
        query: Query.GetQuery2,
        })
        .valueChanges
        .subscribe(({ data }) => {
          this.stores = data.tblstore;
          this.placehold = '倉庫選択';
    
        });
    }
    return this.stores;
  }

  setNext(){
    let i:number = this.gdssrv.get_Goods().findIndex(obj => obj.gcode == this.gcode.toUpperCase());
    if(i > -1 && i < this.gdssrv.get_Goods().length){
      this.gcode = this.gdssrv.get_Goods()[i+1].gcode;
      console.log("setNext",this.gcode);
    }
    this.refresh();
  }

  setPrev(){
    let i:number = this.gdssrv.get_Goods().findIndex(obj => obj.gcode == this.gcode.toUpperCase());
    if(i > 0 ){
      this.gcode = this.gdssrv.get_Goods()[i-1].gcode;
    }
    this.refresh();
  }

  onEnter(): void {
    // console.log("Enter",this.elementRef.nativeElement.querySelector('button'));
    this.elementRef.nativeElement.querySelector('button').focus();
    // console.log("enter",this.trnsrv.tbldata);
    // this.trncomp.upd_Trantbl();
    this.refresh();
  }

  refresh():void {
    // console.log("refresh",this.stcsrv.get_Stock(this.gcode,this.scode));
    // console.log("refresh",this.stcsrv.stock);
    // this.stock = this.stcsrv.get_Stock(this.gcode,this.scode).stock;
    // this.juzan = this.stcsrv.get_Stock(this.gcode,this.scode).juzan;
    // this.htzan = this.stcsrv.get_Stock(this.gcode,this.scode).htzan;
    // console.log("refresh",this.stcsrv.get_Stock(this.gcode,this.scode))
    
    this.setGname();
    // console.log("refresh",this.sukbn);
    if( this.sukbn=='在庫品'){ 
      this.apollo.watchQuery<any>({
        query: Query.GetQuery3,
        variables: { 
            gcode : this.gcode ,
            scode : this.scode
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          // console.log("ref_Query",data.tblstock);
          this.trnsrv.reset_Trans();
          this.stock = data.tblstock[0].stock;
          this.juzan = data.tblstock[0].juzan;
          this.htzan = data.tblstock[0].htzan;
          this.stcsrv.shcnt[0] = data.tblstock[0].sct01;
          this.stcsrv.shcnt[1] = data.tblstock[0].sct02;
          this.stcsrv.shcnt[2] = data.tblstock[0].sct03;
          this.stcsrv.shcnt[3] = data.tblstock[0].sct04;
          this.stcsrv.shcnt[4] = data.tblstock[0].sct05;
          this.stcsrv.shcnt[5] = data.tblstock[0].sct06;
          this.stcsrv.shcnt[6] = data.tblstock[0].sct07;
          this.stcsrv.shcnt[7] = data.tblstock[0].sct08;
          this.stcsrv.shcnt[8] = data.tblstock[0].sct09;
          this.stcsrv.shcnt[9] = data.tblstock[0].sct10;
          this.stcsrv.shcnt[10] = data.tblstock[0].sct11;
          this.stcsrv.shcnt[11] = data.tblstock[0].sct12;
          this.moavg = this.stcsrv.get_Scavg();
          this.ndate = data.tblstock[0].ndate;
          this.incnt = data.tblstock[0].incnt;
          for (let i=0; i < data.tblstock[0].tbltrans.length; i++ ){
            this.trnsrv.set_tblData(data.tblstock[0].tbltrans[i]);
          }
          // console.log("refresh前",this.trncomp);
          this.trncomp.refresh();

        });
    }else if( this.sukbn=='セット品') {
      this.apollo.watchQuery<any>({
        query: Query.GetQuery4,
        variables: { 
          gcode : this.gcode ,
          scode : this.scode
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          this.stcsrv.shcnt[0] = data.tblstock[0].sct01;
          this.stcsrv.shcnt[1] = data.tblstock[0].sct02;
          this.stcsrv.shcnt[2] = data.tblstock[0].sct03;
          this.stcsrv.shcnt[3] = data.tblstock[0].sct04;
          this.stcsrv.shcnt[4] = data.tblstock[0].sct05;
          this.stcsrv.shcnt[5] = data.tblstock[0].sct06;
          this.stcsrv.shcnt[6] = data.tblstock[0].sct07;
          this.stcsrv.shcnt[7] = data.tblstock[0].sct08;
          this.stcsrv.shcnt[8] = data.tblstock[0].sct09;
          this.stcsrv.shcnt[9] = data.tblstock[0].sct10;
          this.stcsrv.shcnt[10] = data.tblstock[0].sct11;
          this.stcsrv.shcnt[11] = data.tblstock[0].sct12;
          this.moavg = this.stcsrv.get_Scavg();
          this.stssrv.reset_Stcks();
          for (let i=0; i < data.tblgczai.length; i++ ){
            const wAble:number = data.tblgczai[i].setgoods.stock - data.tblgczai[i].setgoods.juzan;
            const wStck:Stcks = {irisu:data.tblgczai[i].irisu, ...data.tblgczai[i].setgoods, able: wAble };
            this.stssrv.set_tblData(wStck);
          } 
          this.stscomp.refresh();
        });
    }      
  }
  public async outputCsv(event: any) {
    // let csv:string="";
    // console.log("output",this.gcode); 
    // console.log("外",csv); 


    // // CSV ファイルは `UTF-8 BOM有り` で出力する
    // // そうすることで Excel で開いたときに文字化けせずに表示できる
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    // CSVファイルを出力するために Blob 型のインスタンスを作る
    const blob = new Blob([bom, await this.get_Json()], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link: HTMLAnchorElement = this.elementRef.nativeElement.querySelector('#csv-donwload') as HTMLAnchorElement;
    link.href = url;
    link.download = 'test.csv';
    link.click();

    link.href = 'Mwjexe://1ttest1.csv/';
    link.click();
  }
  get_Json():Promise<string>{
    return new Promise<string>(resolve => {
        this.apollo.watchQuery<any>({
        query: Query.GetQuery5
        })
        .valueChanges
        .subscribe(({ data }) => {
          // let csv:string;
          // for (let i=0; i < data.tblstock.length; i++ ){  
          //   CSV = data.tblstock[i].gcode + ',' 
          //       + data.tblstock[i].storeid + ','
          //       + data.tblstock[i].stock + ',' 
          //       + data.tblstock[i].juzan + ','
          //       + data.tblstock[i].htzan + ','
          //       + data.tblstock[0].sct01 + ','
          //       + data.tblstock[0].sct02 + ','
          //       + data.tblstock[0].sct03 + ','
          //       + data.tblstock[0].sct04 + ','
          //       + data.tblstock[0].sct05 + ','
          //       + data.tblstock[0].sct06 + ','
          //       + data.tblstock[0].sct07 + ','
          //       + data.tblstock[0].sct08 + ','
          //       + data.tblstock[0].sct09 + ','
          //       + data.tblstock[0].sct10 + ','
          //       + data.tblstock[0].sct11 + ','
          //       + data.tblstock[0].sct12 + ;
          // } 
          // console.log("subscribe",json2csv.parse(data.tblstock));
          resolve(json2csv.parse(data.tblstock));
        });
    });  
  }

}
