import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.scss']
})

export class MenuFooterComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  type: string;

  constructor(private breakpointObserver: BreakpointObserver,
              private cookieService: CookieService) {
              }

  ngOnInit() {
    const uid = this.cookieService.get('uid');
    if(uid){
      this.type = 'usuario'
    }

    const rid = this.cookieService.get('rid');
    if(rid){
      this.type = 'responsable'
    }

    const cid = this.cookieService.get('cid');
    if(cid){
      this.type = 'centro'
    }
  }

  load(){
    this.ngOnInit();
    window.location.reload();
  }

}
