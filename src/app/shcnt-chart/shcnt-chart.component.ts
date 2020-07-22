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
  legendTitle = '凡例';
  showXAxisLabel = true;
  xAxisLabel = '出荷月';
  showYAxisLabel = true;
  yAxisLabel = '出荷数';
  showRightYAxisLabel = true;
  yAxisLabelRight = '出荷数昨対(%)';
  showGridLines = false;
  innerPadding = '10%';
  chartData: any[] = [];
  lineChartSeries: any[] = [];
  series: any[] = [];
 　// カラーテーマ
  lineChartScheme = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal',
    domain: ['#a8385d','#01579b']
  };

  comboBarScheme = {
    name: 'singleLightBlue',
    selectable: true,
    group: 'Ordinal',
    domain: ['#01579b']
  };



  // colorScheme = {
  //   domain: ['#FF4081', '#536DFE', '#9C27B0', '#AAAAAA']
  // };

  constructor(private dialogRef: MatDialogRef<ShcntChartComponent>,
              @Inject(MAT_DIALOG_DATA) data ){
                let wdate = moment(data.utime).subtract(13,'months');
                let wtai :number;
                // console.log("dialog",data.utime);
                for (let i=0;i<data.shcnt.length;i++){
                  this.chartData.push({
                    name : wdate.add(1,'months').format("YY/MM")
                  , value : data.shcnt[i] 
                  });
                  if (data.shlas[i] == 0){
                    if (data.shcnt[i] == 0) {
                      wtai = 0;
                    } else {  
                      wtai = 100;
                    }
                  } else {
                    wtai = data.shcnt[i] / data.shlas[i] * 100; 
                  }
                  this.series.push({
                    name : wdate.format("YY/MM")
                    , value : wtai
                  });
                }
                this.lineChartSeries=[{name:'出荷数昨対',series:this.series}]
                // console.log("dialog",this.chartData);
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
