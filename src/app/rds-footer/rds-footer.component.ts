import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rds-footer',
  templateUrl: './rds-footer.component.html',
  styleUrls: ['./rds-footer.component.scss']
})
export class RdsFooterComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  user: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
