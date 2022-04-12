import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CdsAltaResComponent } from '../cds-alta-res/cds-alta-res.component';
import { CdsResponsablesInformacionComponent} from '../cds-responsables-informacion/cds-responsables-informacion.component';
import { AuthService } from '../services/auth.service';
import { CdsService } from '../services/cds.service';
import { ConfirmacionesDialogComponent } from '../confirmaciones-dialog/confirmaciones-dialog.component';

@Component({
  selector: 'app-admin-centros',
  templateUrl: './admin-centros.component.html',
  styleUrls: ['./admin-centros.component.scss']
})
export class AdminCentrosComponent implements OnInit {

  filterPost = '';

  constructor(
    private adminService: AdminService,
    private cdsService: CdsService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  
  ) { }

  centros: any;
  usuarios: any;
  imReady: boolean = false;
  filtro: any;
  newCenter;


  ngOnInit() {
    this.centros = this.adminService.bringAllCen();
    this.usuarios = this.adminService.bringAllUs();
    this.filtro = this.centros;
    this.imReady = true;
  }

  filtrar(e:any){
    console.log(e);
    let palabra = e.target.value
    if (!palabra) {
    return this.filtro = this.centros 
    }
    this.filtro = this.centros.filter( 
      x => x.nombre.toLowerCase().includes(palabra.toLowerCase()) 
      )

  }

  nuevoCentro() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {isCentro: true};
    dialogConfig.width = '500px';
    dialogConfig.height = '280px';

    const dialogRef = this.dialog.open(CdsAltaResComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined){
        // TODO algo  --> snackbar ERROR
      }else{
      this.newCenter = result;
        this.cdsService.addCenter(this.newCenter);
        const config = new MatSnackBarConfig();
        let snackBarRef = this._snackBar.open('✓ Centro creado con éxito',' ', 
        {
          duration: 2500,
          //verticalPosition: 'top',
          panelClass: ['blue-snackbar'],
        });
        snackBarRef.onAction().subscribe(() => {
          location.reload()
        });
        snackBarRef.afterDismissed().subscribe((action) => {
          if (!action)
          location.reload()
        });
      }  
    });
  }

  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;       
    dialogConfig.data = {'type': 'logoutAdmin'};
    dialogConfig.width = "400px";
    this.dialog.open(ConfirmacionesDialogComponent, dialogConfig);
  }

  editarCentro(center: object): void {
    const dialogConfig = new MatDialogConfig();
      console.log(center);
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '500px';
      dialogConfig.height = '280px';
  

      dialogConfig.data = {'center': center, 'isCenter': true}
  
  
  
      const dialogRef = this.dialog.open(CdsResponsablesInformacionComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe( res => {
        if(res === undefined){
          //TODO algo
        }else{
          this.adminService.updateCenter(res, res.id);
        }
      })
    }
}
