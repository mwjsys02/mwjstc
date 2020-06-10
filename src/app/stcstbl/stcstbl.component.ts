import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Stcks, StcksService } from '../stcks.service';

@Component({
  selector: 'app-stcstbl',
  templateUrl: './stcstbl.component.html',
  styleUrls: ['./stcstbl.component.scss']
})
export class StcstblComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() action = new EventEmitter();
  
  displayedColumns = ['gcode','irisu','able','stock','juzan','htzan','ndate','incnt'];
  dataSource = new MatTableDataSource<Stcks>([]);
  
  constructor(public stcsrv:StcksService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;    
    this.stcsrv.observe.subscribe();
  }

  refresh(){
    this.stcsrv.get_tblData().subscribe((data: Stcks[]) => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
  }


}
