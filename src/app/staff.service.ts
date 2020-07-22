import { Injectable } from '@angular/core';

export class Staff {
  tcode: string;
  name: string;
  constructor(init?:Partial<Staff>) {
    Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  tbldata:Staff[]=[];

  constructor() { }

}
