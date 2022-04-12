import { Component, OnInit } from '@angular/core';
import { VacunasService } from '../services/vacunas.service';
import { InventarioService } from '../services/inventario.service';
import { AuthService } from '../services/auth.service';
import { RdsService } from '../services/rds.service';
import { Router } from '@angular/router';
import { RdsColocarComponent } from '../rds-colocar/rds-colocar.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-rds-colocar-via-dni',
  templateUrl: './rds-colocar-via-dni.component.html',
  styleUrls: ['./rds-colocar-via-dni.component.scss']
})
export class RdsColocarViaDniComponent implements OnInit {

  constructor(
    private vacunasService: VacunasService,
    private inventarioService: InventarioService,
    private authService: AuthService,
    private rdsService: RdsService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  vacunas; 
  v: any = {};
  rdsId;
  rdsDatos;
  vid; 
  dni;

  ngOnInit() {
    this.vacunas = this.vacunasService.traerVacunas();

    this.authService.getCurrentUser().then( res => {
      this.rdsId = res;
      this.rdsService.bringRDS(this.rdsId).subscribe( res => {
        this.rdsDatos = res;
        if (res){
        console.log('autorizado')
        } else {
        console.log('denegado')
        this.router.navigate(['/']);
        }
      })
    })
  }

  onClick(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    let data = this.dni + '&&' + this.vid;        
    dialogConfig.data = {data};
    dialogConfig.width = "400px";
            
    this.dialog.open(RdsColocarComponent, dialogConfig);
  }
}


