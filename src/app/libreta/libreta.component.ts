import { Component, OnInit, Inject } from '@angular/core';
import { LibretasService } from '../services/libretas.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { QRdialogComponent } from '../qrdialog/qrdialog.component';
import { GroupbypipeComponent } from '../groupbypipe/groupbypipe.component';
import { VacunaColocadaComponent } from '../vacuna-colocada/vacuna-colocada.component';

@Component({
  selector: 'app-libreta',
  templateUrl: './libreta.component.html',
  styleUrls: ['./libreta.component.scss']
})
export class LibretaComponent implements OnInit {

  constructor(
    private libretasService: LibretasService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  

  nombre;
  vacunas;
  lId;
  vacu;

  ngOnInit() {
    //tomo el id de la libreta que viene en el path
    this.lId = this.route.snapshot.paramMap.get('libretaId');

    //busco la informacion de la libreta, nombre apellido etc
    this.libretasService.searchLibreta(this.lId).subscribe( res => {
      this.nombre = res;
    })

    // busco todas las vacunas 
    this.libretasService.bringVacunas(this.lId).subscribe( res => {
      this.vacunas = res;
      for (this.vacu of this.vacunas){
      if (this.vacu.edad <= 24){
        console.log('estas vacunas son las de meses',this.vacu);
      }
      if (this.vacu.edad > 24){
        console.log('estas vacunas son las de años',this.vacu);
      }
    }

    })

  }

  // en esa funcion se pasan los datos de la vacuna junto con la libreta y abre el modal
  // esto va a 'qrdialog'
  openDialog(id: string, vacunaNombre: string, libretaId: string, nombre: string, apellido: string) {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {id, vacunaNombre, libretaId, nombre, apellido}

        this.dialog.open(QRdialogComponent, dialogConfig);
  }

}


