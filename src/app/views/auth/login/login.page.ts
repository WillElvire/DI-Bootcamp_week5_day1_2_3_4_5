import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppFacade } from 'src/app/core/facades/app.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit , AfterViewInit , OnDestroy {

  loginPayload : {email : string , password : string } = {
    password : '',
    email    : '',
   }
   constructor(private appFacade : AppFacade , private router: Router , private menuController : MenuController) { }

   ngOnInit() {

   }

   ngAfterViewInit(): void {
    this.menuController.close();
   }

  async login(){
     const logs  = this.appFacade.verifyObj(this.loginPayload);
     if(logs.count > 0) {
       return this.displayErrors(logs.index as number[]);
     }
     const response = await this.appFacade.connectUser(this.loginPayload);
     if(response['password'] == this.loginPayload.password) {
        this.router.navigate(['/dash/index']);
        return this.appFacade.buildSuccess("bienvenue");
     }
     return this.appFacade.buildError("Mauvais mot de passe");
  }

   displayErrors(errorTable : number[]) {
     for(let index of errorTable) {
       this.appFacade.buildError(`veuillez renseigner votre ${Object.keys(this.loginPayload)[index]}`)
     }
   }

   ngOnDestroy(): void {
    this.menuController.close();
   }

}
