import { Component, OnInit, Inject } from '@angular/core';
import { LibretasService } from '../services/libretas.service';
import { ActivatedRoute } from '@angular/router';
import { VacunasService} from '../services/vacunas.service';
import { InventarioService } from '../services/inventario.service';
import { LibretaComponent } from '../libreta/libreta.component';
import { MapsService } from '../services/maps.service';



@Component({
  selector: 'app-vacuna-colocada',
  templateUrl: './vacuna-colocada.component.html',
  styleUrls: ['./vacuna-colocada.component.scss']
})
export class VacunaColocadaComponent implements OnInit {

  constructor(
    public maps: MapsService, 
              public libretas:LibretasService,
              public vac: VacunasService,
              private route: ActivatedRoute,
              public inventario: InventarioService,
  ) { }

  vacuna;
  libretaId;
  vacunaId;
  isLoaded: boolean = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('libretaId');
    const tmp = this.route.snapshot.paramMap.get('vacunaId');

        this.libretas.bringUnaVacuna(tmp, id).subscribe(res1 => {
          this.vacuna = res1;
          this.isLoaded = true;
          console.log('esta es la info de la vacuna:', this.vacuna)
        })

  }

}
