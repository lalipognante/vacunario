import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from '../services/inventario.service';
import { AuthService } from '../services/auth.service';
import { CdsService } from '../services/cds.service'


@Component({
  selector: 'app-cds-inventario',
  templateUrl: './cds-inventario.component.html',
  styleUrls: ['./cds-inventario.component.scss']
})
export class CdsInventarioComponent implements OnInit {


  cid; 
  cdsId;
  cdsDatos;
  stock =[];
  filtro: any;

  constructor(private inventarioService: InventarioService, 
              private router: Router,
              private authService: AuthService,
              private cdsService: CdsService,
  ) { }
  filterPost = '';



  ngOnInit() {

    

    // buscar user conectado
    this.authService.getCurrentUser().then( res => {
      this.cdsId = res; 
      // buscar datos del user
      this.cdsService.searchUser(this.cdsId).subscribe( res => {
        this.cdsDatos = res;
        this.cid = this.cdsDatos.centroId;
        //recuperar todos el stock
        this.inventarioService.getStock(this.cid).subscribe( stock => {
          this.stock = stock;
          this.filtro = stock;
        
        })
      })
    }).catch( err => {
      console.log('no hay usuario', err);
    }) 
  }
  filtrar(e:any){
    let palabra = e.target.value
    if (!palabra) return this.filtro = this.stock
    this.filtro = this.stock.filter( x => x.nombre.toLowerCase().includes(palabra.toLowerCase()) )
  }
  responsables() {
    const tmp = 'cds/' + this.cid + '/responsables';
    this.router.navigate([tmp])
  }
}
