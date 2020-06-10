import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
// import { Trans } from '../classes/trans';
import { Trans, TransService } from '../trans.service';

@Component({
  selector: 'app-trantbl',
  templateUrl: './trantbl.component.html',
  styleUrls: ['./trantbl.component.scss']
})
export class TrantblComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // @ViewChild(MatTable, {static: false}) table: MatTable<ITrans>;
  @Output() action = new EventEmitter();
  
  displayedColumns = ['ttype','sday','yday','aitec','aiten','denno','mline','tcode','biko','insuu','ousuu','zaisu'];
  dataSource = new MatTableDataSource<Trans>([]);
  
  constructor(public trnsrv:TransService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;    
    this.trnsrv.observe.subscribe();
  }
  // upd_Trantbl(gcode:string,scode:string): void {
  //   // this.trnsrv.get_Trans(gcode,scode);
  //   console.log(gcode,this.trnsrv.get_Trans(gcode,scode));
  //   // this.trnsrv.reset_Trans();
  //   // const tbldata:Trans[] =this.trnsrv.get_Trans(gcode,scode);
  //   // console.log(gcode,tbldata);
  //   this.dataSource= new MatTableDataSource<Trans>(this.trnsrv.get_Trans(gcode,scode));
  //   // this.table.renderRows();
  //   this.dataSource.paginator = this.paginator;
  // }
  refresh(){
    this.trnsrv.get_tblData().subscribe((data: Trans[]) => {
      // console.log("tbl refresh",data);      
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
  }

  
}
