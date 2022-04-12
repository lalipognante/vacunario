import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MenuFooterComponent } from '../menu-footer/menu-footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( public afAuth: AngularFireAuth,
               private router: Router,
               private authService: AuthService,
               private cookieService: CookieService,
               private menu: MenuFooterComponent) { }


  usuario: any = {};
  errMsj: boolean = false;

  ngOnInit() {
    const uid = this.cookieService.get('uid');
    if(uid){
      this.router.navigate(['/recordatorios']);
    }
  }

  onLogin() {
    this.authService.logIn(this.usuario.mail, this.usuario.passw, "usuario")
      .then(res => {
        const user: any = res;
        this.cookieService.set('uid', user.user.uid);
        this.menu.load();
        this.router.navigate(['/recordatorios']);
      }).catch(err => 
        this.errMsj = true
      );
  }
}
