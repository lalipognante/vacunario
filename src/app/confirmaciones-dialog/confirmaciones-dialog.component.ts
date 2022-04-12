import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef , MatDialog} from "@angular/material";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CdsResponsablesInformacionComponent } from '../cds-responsables-informacion/cds-responsables-informacion.component';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RdsService } from '../services/rds.service';
import { CdsService } from '../services/cds.service';


@Component({
  selector: 'app-confirmaciones-dialog',
  templateUrl: './confirmaciones-dialog.component.html',
  styleUrls: ['./confirmaciones-dialog.component.scss']
})
export class ConfirmacionesDialogComponent implements OnInit {



  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<CdsResponsablesInformacionComponent>,
    public dialogRef2: MatDialogRef<ConfirmacionesDialogComponent>,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private rdsService: RdsService,
    private cdsService: CdsService,


    @Inject(MAT_DIALOG_DATA) data) 
    {
      this.dataIncoming = data;
      if(this.dataIncoming.type === "deleteRDS") {
      this.checkRDS();
      }
      if(this.dataIncoming.type === "deleteCDS") {
        console.log(data);
      this.checkCDS();
      }
     }

    dataIncoming;
    type: string;
    libreta;
    rds: FormGroup;
    id;
    cid;
    cds: FormGroup;


    checkRDS(){
      this.rds = this.dataIncoming.rds;
      this.id = this.dataIncoming.rds.id;
      console.log('log dentro del if',this.rds)
    }

    checkCDS() {
      this.cds = this.dataIncoming.cds;
      this.cid = this.dataIncoming.cds.id;
      console.log('check cds',this.cds)
    }
    



  ngOnInit() {
  }

  logout(){
   console.log(this.dataIncoming)
    this.authService.logout().then(res => {
      if(this.dataIncoming.type === "logout"){
        this.cookieService.delete('rid');
        this.router.navigate(['/rds']);
      } else if (this.dataIncoming.type === "logoutCds"){
        this.cookieService.delete('cid');
        this.router.navigate(['/cds'])
      } else if (this.dataIncoming.type === "logoutAdmin") {
        this.cookieService.delete('aid');
        this.router.navigate(['/admin'])
      }
      this.dialogRef.close();
    })
  }

  deleteRDS(){
    this.rds['activo'] = false;
    this.rdsService.updateRds(this.rds, this.id);
    this.dialogRef.close(this.rds);
    //snackbar
    const config = new MatSnackBarConfig();
    let snackBarRef = this._snackBar.open('✓ Responsable eliminado con éxito','Recargar', 
    {
      duration: 3500,
      panelClass: ['blue-snackbar'],
    });
    snackBarRef.onAction().subscribe(() => {
      window.location.reload()
    });
    snackBarRef.afterDismissed().subscribe((action) => {
      if (!action)
      window.location.reload()
    });
}
  deleteCDS(){
    this.cds['activo'] = false;
    this.cdsService.updateCds(this.cds, this.cid);
    this.dialogRef.close(this.cds);
    //snackbar
    const config = new MatSnackBarConfig();
    let snackBarRef = this._snackBar.open('✓ Administrador eliminado con éxito',' ', 
    {
      duration: 3500,
      panelClass: ['blue-snackbar'],
    });
    snackBarRef.onAction().subscribe(() => {
      window.location.reload()
    });
    snackBarRef.afterDismissed().subscribe((action) => {
      if (!action)
      window.location.reload()
    });
  }
}
