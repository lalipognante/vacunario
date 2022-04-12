import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CdsService } from '../services/cds.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cds-login',
  templateUrl: './cds-login.component.html',
  styleUrls: ['./cds-login.component.scss']
})
export class CdsLoginComponent implements OnInit {

  constructor(
  public afAuth: AngularFireAuth,
  private router: Router,
  private authService: AuthService,
  private cds: CdsService,
  private cookieService: CookieService) { }
 
  rdh: any = {};
  tmp;
  errMsj: boolean = false;
  errMsj2: boolean = false;

  ngOnInit() {
    const cid = this.cookieService.get('cid');
    if(cid){
      this.router.navigate(['cds/home']);
    }
  }

  onLogin() {
    this.authService.logInUid(this.rdh.mail, this.rdh.passw, "centro")
      .then(res => {
        const tmp = res;
        this.cookieService.set('cid', tmp.toString())
        this.cds.searchUser(tmp.toString()).subscribe( res => {
          if (res){
            this.router.navigate(['cds/home']);
          }else {
            this.errMsj2 = true;
          }
        })
      }).catch(err => {
        this.errMsj = true;
    } );
  }

}
