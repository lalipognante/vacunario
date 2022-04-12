import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { InventarioService } from '../services/inventario.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdsService } from '../services/cds.service';
import { VacunasService } from '../services/vacunas.service'
@Component({
  selector: 'app-nuevo-inventario',
  templateUrl: './nuevo-inventario.component.html',
  styleUrls: ['./nuevo-inventario.component.scss']
})

export class NuevoInventarioComponent implements OnInit {
  lote = [
    {id: 'hepatitisb', nombre: 'Hepatitis B', cantidad: 0},
    {id: 'hepatitisa', nombre: 'Hepatitis A', cantidad: 0},
    {id: 'bcg', nombre: 'Tuberculosis (BCG)', cantidad: 0},
    {id: 'neumococo-1', nombre: 'Neumococo Conjugada I', cantidad: 0},
    {id: 'poliomielitis-1', nombre: 'Poliomielitis I', cantidad: 0},
    {id: 'quintuple-1', nombre: 'Quintuple Pentavalente I', cantidad: 0},
    {id: 'rotavirus-1', nombre: 'Rotavirus I', cantidad: 0},
    {id: 'meningococo-1', nombre: 'Meningococo I', cantidad: 0},
    {id: 'neumococo-2', nombre: 'Neumococo Conjugada II', cantidad: 0},
    {id: 'poliomielitis-2', nombre: 'Poliomielitis II', cantidad: 0},
    {id: 'quintuple-2', nombre: 'Quintuple Pentavalente II', cantidad: 0},
    {id: 'rotavirus-2', nombre: 'Rotavirus II', cantidad: 0},
    {id: 'meningococo-2', nombre: 'Meningococo II', cantidad: 0},
    {id: 'poliomielitis-3', nombre: 'Poliomielitis III', cantidad: 0},
    {id: 'quintuple-3', nombre: 'Quintuple Pentavalente III', cantidad: 0},
    {id: 'gripe-1', nombre: 'Gripe I', cantidad: 0},
    {id: 'gripe-2', nombre: 'Gripe II', cantidad: 0},
    {id: 'neumococo-3', nombre: 'Neumococo Conjugada III', cantidad: 0},
    {id: 'triple-viral', nombre: 'Triple Viral I', cantidad: 0},
    {id: 'triple-viral-2', nombre: 'Triple Viral II', cantidad: 0},
    {id: 'meningococo-3', nombre: 'Meningococo III', cantidad: 0},
    {id: 'varicela', nombre: 'Varicela', cantidad: 0},
    {id: 'poliomielitis-4', nombre: 'Poliomielitis IV', cantidad: 0},
    {id: 'quintuple-4', nombre: 'Quintuple Pentavalente IV', cantidad: 0},
    {id: 'fiebre-amarilla-1', nombre: 'Fiebre Amarilla', cantidad: 0},
    {id: 'tiple-bacteriana', nombre: 'Triple Bacteriana', cantidad: 0}
  ];

  cdsId;
  date;
  cid;
  cdsDatos;
  stock;
  vacunas;
  isLoaded: boolean = false;
  isNegative: boolean = false;

  constructor( 
    private inventarioService: InventarioService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdsService: CdsService,
    private vacunasService: VacunasService,

  ) {   }

  
  ngOnInit() {
    // buscar el user actual conectado
    this.authService.getCurrentUser().then( res => {
      this.cdsId = res.toString();

      // busca sus datos
      this.cdsService.searchUser(this.cdsId).subscribe( res => {
        this.cdsDatos = res; 
        this.cid = this.cdsDatos.centroId;
      })
    })

    // obtener fecha de hoy
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    this.date = dd + '/' + mm + '/' + yyyy;


    this.isLoaded = true;
  }

  displayedColumns: string[] = ['nombre', 'cantidad'];
  dataSource = this.lote;


  cargarLote(){
    // limpiar el lote, todas aquellas vacunas que sean = a 0 se sacan
    let loteLimpio = [], counter = 0;
    for(let i=0; i<this.lote.length; i++){
      if(this.lote[i].cantidad !== 0){
        loteLimpio[counter] = this.lote[i];
        counter++;
      }
    }
    this.inventarioService.updateStock(this.cid, loteLimpio);
    this.router.navigate(['cds/inventario']);
    this.snackBar.open('✓ Vacunas cargadas con éxito' , '',   
    {
      duration: 2500,
      //verticalPosition: 'top',
      panelClass: ['blue-snackbar'],
    });
     
  }

}