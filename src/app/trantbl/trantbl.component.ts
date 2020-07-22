import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { Trans } from '../classes/trans';
import { Trans, TransService } from '../trans.service';

@Component({
  selector: 'app-trantbl',
  templateUrl: './trantbl.component.html',
  styleUrls: ['./trantbl.component.scss']
})
export class TrantblComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: false}) sort: MatSort;
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
  refresh(): void{
    this.trnsrv.get_tblData().subscribe((data: Trans[]) => {
      // console.log("tbl refresh",data);
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
  }

  setColor(ttype:string): string {
    let color:string;
    switch(ttype){
      case "発注":
        color = 'aqua';
        break;
      case "受注返品":
        color = 'slategray';
        break;
      case "仕入":
        color = 'mediumblue';
        break;
      case "仕入返品":
        color = 'navy';
        break;
      case "展開先":
        color = 'darkorange';
        break;
      case "展開元":
        color = 'orange';
        break;
      case "移動入庫":
        color = 'blue';
        break;
      case "移動出庫":
        color = 'royalblue';
        break;
      case "破棄":
        color = 'red';
        break;
      case "発注外入荷":
        color = 'green';
        break;
      case "棚卸":
        color = 'magenta';
        break;  
      default:
        color = 'black';
    } 
    return color;
  }

  chFlg(): void{
    this.trnsrv.flg *= -1;
    this.refresh();
  }
}
