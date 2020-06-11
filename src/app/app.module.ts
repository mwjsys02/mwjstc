import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from './graph-ql/graph-ql.module';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { GcodeHelpComponent } from './gcode-help/gcode-help.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GcdtblComponent } from './gcdtbl/gcdtbl.component';
import { HttpClientModule } from '@angular/common/http';
import { TrantblComponent } from './trantbl/trantbl.component';
import { BlankPipe } from './pipes/blank.pipe';
import { StcstblComponent } from './stcstbl/stcstbl.component';
import { ShcntChartComponent } from './shcnt-chart/shcnt-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DlCondComponent } from './dl-cond/dl-cond.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewStockComponent,
    GcodeHelpComponent,
    GcdtblComponent,
    TrantblComponent,
    BlankPipe,
    StcstblComponent,
    ShcntChartComponent,
    DlCondComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    NgxChartsModule

    ,MatButtonModule
    ,MatCardModule
    ,MatDialogModule
    ,MatFormFieldModule
    ,MatIconModule
    ,MatInputModule
    ,MatSelectModule
    ,MatTableModule
    ,MatToolbarModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    GcodeHelpComponent,
    ShcntChartComponent,
    DlCondComponent]
})
export class AppModule { }
