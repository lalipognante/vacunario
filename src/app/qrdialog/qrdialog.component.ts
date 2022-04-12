import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LibretaComponent } from '../libreta/libreta.component';
import { LibretasService } from '../services/libretas.service';
import { RdsService } from '../services/rds.service';
import { CdsService } from '../services/cds.service';
import { CdsResponsablesInformacionComponent} from '../cds-responsables-informacion/cds-responsables-informacion.component';


@Component({
  selector: 'app-qrdialog',
  templateUrl: './qrdialog.component.html',
  styleUrls: ['./qrdialog.component.scss']
})
export class QRdialogComponent implements OnInit {

  description;
  libretaId;
  vacunaId;
  centro;
  cid;
  infovacunas;
  rdsId;
  responsable;
  value;
  isLoaded: boolean = false;
  isLoaded2: boolean = false;

  constructor(
    private libretasService: LibretasService,
    private rdsService: RdsService,
    private cdsService: CdsService,

    // recibimos la informacion que envio libreta.component
    private dialogRef: MatDialogRef<QRdialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) 
      
    { 
    // tomamos la informacion que nos trajo data, que es la que envio libreta.component
    this.description = data;
    this.libretaId = this.description.libretaId;
    this.vacunaId = this.description.id;
    // aca seteamos el link que lleva el qr
    this.value = this.libretaId + '&&' + this.vacunaId;
  }

  elementType : 'url' | 'canvas' | 'img' = 'url';

  ngOnInit() {
    //traigo toda la información de esa vacuna
    this.libretasService.bringUnaVacuna(this.vacunaId, this.libretaId).subscribe(res => {
        this.infovacunas = res;
         this.rdsId= this.infovacunas.rds;
         this.isLoaded = true;
    //traigo al responsable de esa vacuna
    this.rdsService.bringRDS(this.rdsId).subscribe( res2 => {
      this.responsable = res2;
      this.cid = this.responsable.centroId;
      //buscas el centro
        this.cdsService.searchCentro(this.cid).subscribe( res3 => {
          this.isLoaded2 = true;
          this.centro = res3;
        });
      });
    })
   close();
  }
}
