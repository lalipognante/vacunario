import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  mail;
  ok: boolean = false;

  ngOnInit() {
  }

  recover(){
    this.authService.recoverPassword(this.mail);
    this.ok = true;
  }

}
