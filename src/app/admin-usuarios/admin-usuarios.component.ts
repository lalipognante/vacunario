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
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {

  filtro: any;
  

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private cdsService: CdsService,
    
  ) { }

  filterPost = '';

  usuarios;
  centros;
  imReady: boolean = false;
  newUser: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.usuarios = this.adminService.bringAllUs();
    this.centros = this.adminService.bringAllCen();
    this.imReady = true;
    this.filtro = this.usuarios;
  }

  filtrar(e:any){
    console.log(e);
    let palabra = e.target.value
    if (!palabra) {
    return this.filtro = this.usuarios 
    }
    this.filtro = this.usuarios.filter(  
      x => x.apellido.toLowerCase().includes(palabra.toLowerCase())
      )
  }

  nuevoUsuario() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {isCds: true, centros: this.centros};
    dialogConfig.width = '500px';
    dialogConfig.height = '550px';


    const dialogRef = this.dialog.open(CdsAltaResComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if(result === undefined){
          // TODO algo  --> snackbar ERROR
        }else{
        this.newUser = result;

        this.authService.register(this.newUser.mail, this.newUser.pass).then( res => {
          const tmp = res.toString();
          this.cdsService.addCds(this.newUser, tmp);
          const config = new MatSnackBarConfig();
          let snackBarRef = this._snackBar.open('✓ Responsable creado con éxito','Recargar', 
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
        }).catch(err => {
          console.log(err)
        })
        }  
      });
  }

  editarResponsable(cds: object): void {
    const dialogConfig = new MatDialogConfig();
      console.log(cds);
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '500px';
      dialogConfig.height = '430px';
  

      dialogConfig.data = {'cds': cds, 'isCds': true}
  
  
  
      const dialogRef = this.dialog.open(CdsResponsablesInformacionComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe( res => {
        if(res === undefined){
          //TODO algo
        }else{
          console.log(res)
          this.cdsService.updateCds(res, res.id);
          
        }
      })
    }
  
    cambiarPassword(rds: object){
      const dialogConfig = new MatDialogConfig();
      
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '500px';
      dialogConfig.height = '500px';
  
      rds['type'] = 'cambioPass';
      dialogConfig.data = {rds}
  
      this.dialog.open(CdsResponsablesInformacionComponent, dialogConfig);
    }

    logout(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;       
      dialogConfig.data = {'type': 'logoutAdmin'};
      dialogConfig.width = "400px";
      this.dialog.open(ConfirmacionesDialogComponent, dialogConfig);
    }
}

