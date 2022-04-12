import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { MenuFooterComponent } from '../menu-footer/menu-footer.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private menu: MenuFooterComponent
  ) { }

  ngOnInit() {
  }

logout(){
  this.authService.logout()
  .then( res => {
    this.cookieService.delete('uid');
    this.router.navigate(['/login']);
  })
}

}
