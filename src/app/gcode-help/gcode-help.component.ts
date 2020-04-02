import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Goods,GoodsService } from '../goods.service';

@Component({
  selector: 'app-gcode-help',
  templateUrl: './gcode-help.component.html',
  styleUrls: ['./gcode-help.component.scss']
})
export class GcodeHelpComponent implements OnInit {
  
  // public filter:string;
  // public selected:string;  
  
  constructor(public gdsservice:GoodsService,
              private dialogRef: MatDialogRef<GcodeHelpComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
              this.gdsservice.filtx = data.filter;
              // console.log("gcode-help",data);
  }

  ngOnInit(): void {




  }

  sel_gcd(selected:Goods ) {
    // console.log("select",selected);
    this.dialogRef.close(selected);
  }

  close() {
    this.dialogRef.close();
  }

}
