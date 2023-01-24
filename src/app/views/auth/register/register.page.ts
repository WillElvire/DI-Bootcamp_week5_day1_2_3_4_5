import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppFacade } from 'src/app/core/facades/app.facade';
import { User } from 'src/app/core/interfaces/user';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers : [AppFacade]

})
export class RegisterPage implements OnInit {

  user : User = {
   username : '',
   password : '',
   email    : '',
   id       : uuidv4()
  }
  constructor(private appFacade : AppFacade , private router: Router , private menuController : MenuController) { }

  ngOnInit() {
    this.menuController.close()
  }

  register(){
    const logs  = this.appFacade.verifyObj(this.user);
    if(logs.count > 0) {
      return this.displayErrors(logs.index as number[]);
    }
    this.appFacade.addUser(this.user).then((response)=>{
      this.appFacade.buildSuccess("votre inscription a été effectué");
      this.router.navigate(['/auth/login']);
    });
  }

  displayErrors(errorTable : number[]) {
    for(let index of errorTable) {
      this.appFacade.buildError(`veuillez renseigner votre ${Object.keys(this.user)[index]}`)
    }
  }
}
