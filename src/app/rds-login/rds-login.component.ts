import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RdsService } from '../services/rds.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-rds-login',
  templateUrl: './rds-login.component.html',
  styleUrls: ['./rds-login.component.scss']
})
export class RdsLoginComponent implements OnInit {

  constructor( 
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private rdsService: RdsService,
    private cookieService: CookieService) { }
   
    rds: any = {};
    tmp;
    errMsj: boolean = false;
    errMsj2: boolean = false;
    
  ngOnInit() {
    const rid = this.cookieService.get('rid');
    if(rid){
      this.router.navigate(['rds/home']);
    }
  }

  onLogin() {
    this.authService.logInUid(this.rds.mail, this.rds.passw, "responsable")
      .then((res) => {
        const tmp = res;
        this.cookieService.set('rid', tmp.toString());
        this.rdsService.bringRDS(tmp.toString()).subscribe( res => {
          if (res){
            this.router.navigate(['rds/home']);
          }else {
            this.errMsj2 = true;
          }
        })
      }).catch(err => {
        this.errMsj = true;
    } );
  }
}


