import { Injectable } from "@angular/core";

@Injectable({
  providedIn : "root"
})
export class  VerificationService {

  constructor(){

  }

  verifyField(field : any ) {
    return !!field;
  }

  verifyObj(obj : {},logType : string = "error") {
    let count= 0;
    let index : number[] = [];

    Object.values(obj).forEach((value,i)=>{
      if(!value) {
        index.push(i)
        count ++;
      }
    })
    return  logType == "error" ? {count , index } : {count};
  }

}
