import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService,
    private cookieService: CookieService
  ) { }

  admin: any = {};
  tmp;
  errMsj: boolean = false;
  errMsj2: boolean = false;

  ngOnInit() {
    const aid = this.cookieService.get('aid');
    if(aid){
      this.router.navigate(['admin/home']);
    }
  }

  onLogin() {
    this.authService.logInUid(this.admin.mail, this.admin.passw, "centro")
      .then(res => {
        const tmp = res;
        this.cookieService.set('aid', tmp.toString())
        this.adminService.searchAdmin(tmp.toString()).subscribe( res => {
          if (res){
            this.router.navigate(['admin/home']);
          }else {
            this.errMsj2 = true;
          }
        })
      }).catch(err => {
        this.errMsj = true;
    } );
  }

}