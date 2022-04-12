import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CdsService } from '../services/cds.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CdsAltaResComponent } from '../cds-alta-res/cds-alta-res.component';
import { CdsResponsablesInformacionComponent} from '../cds-responsables-informacion/cds-responsables-informacion.component';
import { RdsService } from '../services/rds.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cds-responsables',
  templateUrl: './cds-responsables.component.html',
  styleUrls: ['./cds-responsables.component.scss']
})
export class CdsResponsablesComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private cdsService: CdsService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private rdsService: RdsService) { }


  rds: any = [];
  public cid;

  ngOnInit() {

    this.cid = this.route.snapshot.paramMap.get('id');
        
    this.cdsService.bringAllByCentro(this.cid).subscribe( res => {
        let count = 0; 
        //le agrego a cada uno su id
        res.forEach(doc => {
          let tmp; 
          tmp = doc.data();
          tmp.id = doc.id;
          this.rds[count] = tmp;
          count ++;
      })
  })
}


agregarResponsable(): void {

  const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {isRds: true};
    dialogConfig.width = '500px';
    dialogConfig.height = '650px';


    const dialogRef = this.dialog.open(CdsAltaResComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if(result === undefined){
          // TODO algo  --> snackbar ERROR
        }else{
        this.rds = result;
        this.rds.centroId = this.cid;
        this.authService.register(this.rds.mail, this.rds.pass).then( res => {
          const tmp = res.toString();
          this.rdsService.addRds(this.rds, tmp);
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
          
          // location.reload()

        }).catch(err => {
          console.log(err)
        })
        }  
      });



    }

editarResponsable(rds: object): void {
  const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '550px';

  
    dialogConfig.data = {'rds': rds, 'isRds': true}



    const dialogRef = this.dialog.open(CdsResponsablesInformacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( res => {
      if(res === undefined){
        //TODO algo
      }else{
        console.log(res)
        this.rdsService.updateRds(res, res.id);
        
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
  
}
