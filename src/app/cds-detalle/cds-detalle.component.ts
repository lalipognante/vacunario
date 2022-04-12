import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-cds-detalle',
  templateUrl: './cds-detalle.component.html',
  styleUrls: ['./cds-detalle.component.scss']
})
export class CdsDetalleComponent implements OnInit {

displayedColumns: string[] = ['nombre', 'cantidad'];

  constructor(
     // recibimos la informacion que envio libreta.component
     private dialogRef: MatDialogRef<CdsDetalleComponent>,
     @Inject(MAT_DIALOG_DATA) data,
     public inventarioService: InventarioService
     ) {

      this.id = data.id;
      this.cid = data.cid;
      // this.inventarioService.getOneInventario(this.id, this.cid).subscribe( res => {
      //   this.respuestas = res;
      // })
      
     }
  public id;
  public respuestas;
  public cid;

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
