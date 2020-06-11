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
    console.log("select",this.gcdword);
    if (this.scode==''){
      this.scode='%';
    }
    this.dialogRef.close({scode:this.scode,gcdword:this.gcdword + '%'});
  }

  close() {
    this.dialogRef.close();
  }
}
