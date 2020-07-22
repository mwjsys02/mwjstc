import { Pipe, PipeTransform } from '@angular/core';
import { StaffService } from '../staff.service';

@Pipe({
  name: 'staff'
})
export class StaffPipe implements PipeTransform {
  constructor(private stfsrv: StaffService) {}
  transform(value: string): string {
    let sname: string;
    let i:number = this.stfsrv.tbldata.findIndex(obj => obj.tcode == value.trim());
    console.log(value,i);
    if(i > -1 ){
      sname = this.stfsrv.tbldata[i].name;
    } else {
      if(value=="0"){
        sname="";
      }else{
        sname = value + "(未登録)" ;
      }
      
    }
    return sname;    
  }

}