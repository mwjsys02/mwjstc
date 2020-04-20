import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GcodeHelpComponent } from '../gcode-help/gcode-help.component';
import { GoodsService } from '../goods.service';
import { HttpClient } from '@angular/common/http';
// import { StockService } from '../stock.service';
// import { Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import * as Query from '../graph-ql/queries';
import * as fs from 'fs';

interface Store {
  scode: string;
  sname: string;
}
interface ActiveXObject {
  new(s: string): any;
}
declare const ActiveXObject: ActiveXObject;

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
  public sukbn: number=0;
  public gname: string="";
  public stock: number=0;
  public juzan: number=0;
  public ndate: Date;
  public incnt: number=0;
  public htzan: number=0;
  public moavg: number=0;
  public scdbk: string="";
  public gcdbk: string="";
  
  constructor(private gdssrv: GoodsService,
              // private stcsrv: StockService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private elementRef: ElementRef,
              private http: HttpClient,
              private apollo: Apollo) { }

  ngOnInit(): void {
    this.placehold = '倉庫読込中';
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

    if (typeof this.route.snapshot.params.gcd != "undefined") {
      this.gcode= this.route.snapshot.params.gcd;
      this.scode= '01';
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
          }
      }
    );

  }
  setGname():void{
    console.log(this.gcode);
    let i:number = this.gdssrv.goods.findIndex(obj => obj.gcode == this.gcode.toUpperCase());
    // console.log(i,this.gdssrv.goods);
    if(i > -1){
      this.gname = this.gdssrv.goods[i].gname;
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

    onEnter(): void {
    // console.log("Enter",this.elementRef.nativeElement.querySelector('button'));
    this.elementRef.nativeElement.querySelector('button').focus();
  }

  refresh():void {
    // console.log("refresh",this.stcsrv.get_Stock(this.gcode,this.scode));
    // console.log("refresh",this.stcsrv.stock);
    // this.stock = this.stcsrv.get_Stock(this.gcode,this.scode).stock;
    // this.juzan = this.stcsrv.get_Stock(this.gcode,this.scode).juzan;
    // this.htzan = this.stcsrv.get_Stock(this.gcode,this.scode).htzan;
    // console.log("refresh",this.stcsrv.get_Stock(this.gcode,this.scode))
    if( this.gcode != this.gcdbk || this.scode != this.scdbk ){ 
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
          this.stock = data.tblstock[0].stock;
          this.juzan = data.tblstock[0].juzan;
          this.htzan = data.tblstock[0].htzan;
          // console.log("Queryp",pgcode);
          this.gcdbk = this.gcode;
          // console.log("Queryg",this.gcode);
          this.scdbk = this.scode;
          // console.log("Query",this.stock)
          this.setGname();
        });
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
          this.stock = data.tblstock[0].stock;
          this.juzan = data.tblstock[0].juzan;
          this.htzan = data.tblstock[0].htzan;
          // console.log("Queryp",pgcode);
          this.gcdbk = this.gcode;
          // console.log("Queryg",this.gcode);
          this.scdbk = this.scode;
          // console.log("Query",this.stock)
          this.setGname();
        });
    };
  }
  public async outputCsv(event: any): Promise<any> {
        
    const csv = 'テストデータです';

    // CSV ファイルは `UTF-8 BOM有り` で出力する
    // そうすることで Excel で開いたときに文字化けせずに表示できる
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    // CSVファイルを出力するために Blob 型のインスタンスを作る
    const blob = new Blob([bom, csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link: HTMLAnchorElement = this.elementRef.nativeElement.querySelector('#csv-donwload') as HTMLAnchorElement;
    link.href = url;
    link.download = 'test.csv';
    link.click();
    var httpObj = this.http.get('assets/excel');
  }
}
