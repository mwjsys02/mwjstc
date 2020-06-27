import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewStockComponent } from  './view-stock/view-stock.component';


const routes: Routes = [
    { path: '', 
    redirectTo: 'stock',
    pathMatch: 'full' 
  },
  {
    path: 'stock',
    component: ViewStockComponent
  // },
  // {
  //   path: 'stock/:gcd',
  //   component: ViewStockComponent
  // },
  // {
  //   path: 'stock/:gcd/:scd',
  //   component: ViewStockComponent
  }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {
  //   useHash: true,
  // })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
