import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Goods,GoodsService } from '../goods.service';

@Component({
  selector: 'app-gcdtbl',
  templateUrl: './gcdtbl.component.html',
  styleUrls: ['./gcdtbl.component.scss']
})
export class GcdtblComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() setgcd = new EventEmitter();
  public filters: any = [{id:'gcode',value:''},
                         {id:'gname',value:''}];
  dataSource:MatTableDataSource<Goods>;
  displayedColumns = ['gcode','gname','sukbn'];
  constructor(public gdsservice:GoodsService,
              private elementRef: ElementRef) { 
    this.dataSource= new MatTableDataSource<Goods>(this.gdsservice.get_Goods());
  }

  ngOnInit(): void {
    // this.elementRef.nativeElement.querySelector('input').value = this.gdsservice.filtx;
    this.dataSource.paginator = this.paginator;    
    this.gdsservice.observe.subscribe();
    this.dataSource.filterPredicate = (data: Goods, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);
      filters.forEach(filter => {
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    this.updateFilter('gcode',this.gdsservice.filtx);
  }

  setGcode(row){
    // console.log("setGcode");
    this.gdsservice.selro = row;
    this.setgcd.emit(this.gdsservice.selro);
  }

  applyFilter():void {
    this.dataSource.filter = JSON.stringify(this.filters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateFilter(fldid: string, filval: string) :void{
    let i:number = this.filters.findIndex(obj => obj.id == fldid);
    this.filters[i].value = filval;
    this.applyFilter();
  }
  // select_gcd(row):void {
  //   this.gdsservice.selgd = row.gcode;
  //   console.log(row,this.gdsservice.selgd);
  // }

  updateData(): void {
    //tableのデータソース更新
    this.dataSource= new MatTableDataSource<Goods>(this.gdsservice.get_Goods());
    this.dataSource.paginator = this.paginator;
  }
}
