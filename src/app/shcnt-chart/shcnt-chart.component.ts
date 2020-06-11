import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from 'moment';

@Component({
  selector: 'app-shcnt-chart',
  templateUrl: './shcnt-chart.component.html',
  styleUrls: ['./shcnt-chart.component.scss']
})
export class ShcntChartComponent implements OnInit {

  // グラフの表示サイズ
  view: any[] = [innerWidth / 1.3, 400];

  // 設定
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '出荷月';
  showYAxisLabel = true;
  yAxisLabel = '出荷数';
  chartData: any[] = [];

　// カラーテーマ
  colorScheme = {
    domain: ['#FF4081', '#536DFE', '#9C27B0', '#AAAAAA']
  };

  constructor(private dialogRef: MatDialogRef<ShcntChartComponent>,
              @Inject(MAT_DIALOG_DATA) data ){
                let wdate = moment(data.utime).subtract(13,'months');
                console.log("dialog",data.utime);
                for (let i=0;i<data.shcnt.length;i++){
                  this.chartData.push({
                    name : wdate.add(1,'months').format("YYYY年MM月")
                  , value : data.shcnt[i] 
                  });
                }
                console.log("dialog",this.chartData);
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
