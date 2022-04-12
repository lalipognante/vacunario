import { Component, OnInit, Inject } from '@angular/core';
import { LibretasService } from '../services/libretas.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RdsService } from '../services/rds.service';
import { InventarioService } from '../services/inventario.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VacunasService } from '../services/vacunas.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";


@Component({
  selector: 'app-rds-colocar',
  templateUrl: './rds-colocar.component.html',
  styleUrls: ['./rds-colocar.component.scss']
})
export class RdsColocarComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RdsColocarComponent>,
      @Inject(MAT_DIALOG_DATA) data,

  
    private libretasService: LibretasService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private rdsService: RdsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private inventarioService: InventarioService,
    private vacunasService: VacunasService, 
  ) { 
    this.tmp = data.data;
    let separador = this.tmp.split('&&');
    this.libretaId = separador[0];
    this.vacunaId = separador[1];
  }

  tmp;
  libretaId;
  vacunaId;
  vacunaDeLibreta;
  estaColocada: boolean = false;
  vacuna;
  rdsId;
  rdsDatos;
  fecha;
  datos;
  isLoaded: boolean = false;
  isLoaded2: boolean = false;

  ngOnInit() {
    this.rdsId = this.authService.getCurrentUser().then( res => {
      this.rdsId = res;
      this.rdsService.bringRDS(this.rdsId).subscribe( res => {
        this.rdsDatos = res;
      })
    })
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.fecha = dd + '/' + mm + '/' + yyyy;

    this.libretasService.searchLibreta(this.libretaId).subscribe( res => {
      this.datos = res;
      if(!res){
        this.dialogRef.close();
        this._snackBar.open('Documento erroneo! Revise los datos' , 'Cerrar');
      }
      this.libretasService.bringUnaVacuna(this.vacunaId, this.libretaId).subscribe(res => {
        this.vacunaDeLibreta = res;
        if(this.vacunaDeLibreta.colocada === true){
          this.estaColocada = true;
          this.isLoaded2 = true;
        }
      })
      this.vacunasService.buscarVacuna(this.vacunaId).subscribe( res => {
        this.vacuna = res;
        this.isLoaded = true;
      })
    })

  }

  
 
  // colocar vacuna, se pasa a true, el id del responsable y la fecha
  onClick() {
    this.libretasService.colocarVacuna(
      this.vacunaId, 
      this.libretaId, 
      {colocada: true, rds: this.rdsId, fecha: this.fecha}
    );
    this.inventarioService.discountVacuna(this.vacunaId, this.rdsDatos.centroId, 1)
    this.dialogRef.close();
    this._snackBar.open('✓ Vacuna colocada!' , '', 
    {
      duration: 2000,
      // verticalPosition: 'top',
      panelClass: ['blue-snackbar'],
    });
    
  }


}
