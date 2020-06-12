import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store, StoreService } from '../store.service';
import { Goods,GoodsService } from '../goods.service';

@Component({
  selector: 'app-dl-cond',
  templateUrl: './dl-cond.component.html',
  styleUrls: ['./dl-cond.component.scss']
})
export class DlCondComponent implements OnInit {
  public scode: string="";
  public gcdword : string="";
  public gnmword : string="";
  constructor(private dialogRef: MatDialogRef<DlCondComponent>,
              public gdssrv:GoodsService,                     
              public stosrv:StoreService) { }

  ngOnInit(): void {
  }

  dl() {
    // console.log("select",this.gdssrv.get_Goods());
    if (this.scode==''){
      this.scode='%';
    }
    const result = this.gdssrv.get_Goods().filter( obj => { 
        return (obj.gcode.indexOf(this.gcdword.toUpperCase()) === 0 && obj.gname.indexOf(this.gnmword.toUpperCase()) > -1 );
      })
    // let vargcd:string= '"' + result[0].gcode + '"';
      let vargcd:string[] = [];
    　for (let i=0;i<result.length;i++){
      // vargcd += ',"' + result[i].gcode + '"' ;
      vargcd.push(result[i].gcode);
    }
    // vargcd += ']';
    // this.dialogRef.close({scode:this.scode,gcdword:this.gcdword + '%'});
    // console.log("select",vargcd);
    this.dialogRef.close({scode:this.scode,arrgcode:vargcd});
  }

  close() {
    this.dialogRef.close();
  }
}
