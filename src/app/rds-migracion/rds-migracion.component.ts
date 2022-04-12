import { Component, OnInit } from '@angular/core';
import { LibretasService } from '../services/libretas.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-rds-migracion',
  templateUrl: './rds-migracion.component.html',
  styleUrls: ['./rds-migracion.component.scss']
})
export class RdsMigracionComponent implements OnInit {

  dni;
  vacunas;
  rdsId;
  fecha;
  isLoaded: boolean = false;

  constructor(
    private libretaService: LibretasService,
    private authService: AuthService,    
    private _snackBar: MatSnackBar,
    private router: Router,

  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().then( res => {
      this.rdsId = res;
    }).catch( err => {
      console.log(err);
    })

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.fecha = dd + '/' + mm + '/' + yyyy;
  }

  buscarLibreta(){
    this.libretaService.bringVacunas(this.dni).subscribe( res => {
      if(res.length === 0){
        this._snackBar.open('Carnet inexistente!', 'Cerrar', {duration: 5000})
      } else {
        this.vacunas = res;
        this.isLoaded = true;
      }
      
    })
  }

  onClick(){
    for(let vacuna of this.vacunas){
      if(vacuna.colocada === true){
        vacuna.rds = this.rdsId;
        vacuna.fecha = this.fecha;
        this.libretaService.colocarVacuna(vacuna.id, this.dni, vacuna);
        this._snackBar.open('✓ Carnet migrado con éxito','', 
        {
          duration: 2000,
          // verticalPosition: 'top',
          panelClass: ['blue-snackbar'],
        });
      }
      this.router.navigate(['/rds/home']);
    }
  }
  
}
