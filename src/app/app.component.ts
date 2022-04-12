import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuFooterComponent } from './menu-footer/menu-footer.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vacunario';
  constructor(
    private router: Router,
    private location: Location
  ) { }
  headerFooter;
  
  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.headerFooter = (event.url !== '/login')
        }
      });
    
  }

  back() {
    this.location.back();
  }
}
