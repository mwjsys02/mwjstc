import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import * as Query from './graph-ql/queries';

export interface Goods {
  gcode: string;
  gname: string;
  sukbn: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  public goods: Goods[]=[];
  public selro: Goods;
  public filtx: string;
  public subject = new Subject<Goods[]>();
  public observe = this.subject.asObservable();

  constructor(private apollo: Apollo) { }

  get_Goods():Goods[] {
    // this.goods=["NG23-S-WH","NG20-S-WH"];
    if (this.goods.length == 0) {
      this.apollo.watchQuery<any>({
        query: Query.GetQuery1,
        })
        .valueChanges
        .subscribe(({ data }) => {
          this.goods = data.tmpstc_tblgoods ;
        });
    }  
    return this.goods;
  }
}
