import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RdsService } from '../services/rds.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacionesDialogComponent } from '../confirmaciones-dialog/confirmaciones-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-rds-home',
  templateUrl: './rds-home.component.html',
  styleUrls: ['./rds-home.component.scss']
})
export class RdsHomeComponent implements OnInit {

  rid;
  rds;
  isLoaded: boolean = false;


  constructor(
    private authService: AuthService,
    private rdsService: RdsService,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.authService.getCurrentUser().then( res => {
      this.rid = res.toString();
      this.rdsService.bringRDS(this.rid).subscribe( res => {
        this.rds = res;
        this.isLoaded = true;
      })
    }).catch(err => {
      console.log("no habemus user")
    })
  }

  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;       
    dialogConfig.data = {'type': 'logout'};
    dialogConfig.width = "400px";
    this.dialog.open(ConfirmacionesDialogComponent, dialogConfig);
  }
}
