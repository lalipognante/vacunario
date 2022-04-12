import { Component, OnInit } from '@angular/core';
import { VacunasService } from '../services/vacunas.service';
import { InventarioService } from '../services/inventario.service';
import { AuthService } from '../services/auth.service';
import { RdsService } from '../services/rds.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-rds-manual',
  templateUrl: './rds-manual.component.html',
  styleUrls: ['./rds-manual.component.scss']
})
export class RdsManualComponent implements OnInit {

  constructor(
    private vacunasService: VacunasService,
    private inventarioService: InventarioService,
    private authService: AuthService,
    private rdsService: RdsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private snack: MatSnackBar,
  ) { }

  vacunas; 
  v: any = {};
  rdsId;
  rdsDatos;

  ngOnInit() {
    this.vacunas = this.vacunasService.traerVacunas();

    this.rdsId = this.authService.getCurrentUser().then( res => {
      this.rdsId = res;
      this.rdsService.bringRDS(this.rdsId).subscribe( res => {
        this.rdsDatos = res;
        if (res){
        console.log('autorizado')
        } else {
        console.log('denegado')
        this.router.navigate(['/home']);
        }
      })
    })
  }

  actualizarVal() {
    this.inventarioService.discountVacuna(this.v.id, this.rdsDatos.centroId, this.v.cantidad);
    this._snackBar.open('✓ Vacunas registradas con éxito','', 
    {
      duration: 2000,
      // verticalPosition: 'top',
      panelClass: ['blue-snackbar'],
    });
    this.router.navigate(['/rds/home']);
  }

}
