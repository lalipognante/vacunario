import { Component, OnInit } from '@angular/core';
import { MapsService } from '../services/maps.service';
import { VacunasService} from '../services/vacunas.service';
import { LibretasService } from '../services/libretas.service';
import { ActivatedRoute } from '@angular/router';
import * as geofirex from 'geofirex';
import { InventarioService } from '../services/inventario.service';
import { CdsService } from '../services/cds.service'

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  icon={
    url: '../assets/img/markerIcon2.png',
    scaledSize: { width: 40 , height: 50 }
  };

  icon2={
    url: '../assets/img/selfMarker.png',
    scaledSize: { width: 20 , height: 20 }
  };


  zoom: number = 12;
  mapas
  vacuna
  latitud;
  longitud;
  isLoaded: boolean = false;
  isLoaded2: boolean = false;

  constructor(public maps: MapsService, 
              public libretas:LibretasService,
              public vac: VacunasService,
              private route: ActivatedRoute,
              public inventario: InventarioService,
              public cds: CdsService
  )
  { }
  ngOnInit() {

    //tomo el id de la vacuna que viene en el path
    const tmp = this.route.snapshot.paramMap.get('vacunaId');
    this.vac.bringVacuna(tmp).subscribe(res1 => {
      this.vacuna = res1;
      this.isLoaded = true;
    })

    this.maps.bringCentroCVacuna(tmp).then( res => {
      this.mapas = res;
      this.isLoaded2 = true;
     }).catch( err => {
       console.log(err);
    })


    this.getUserLocation()
  }
  
 //  ----PARA TOMAR GPS ACTUAL DEL USUARIO-------
  getUserLocation(){
      this.latitud = -31.41067;
      this.longitud = -64.189381;
      navigator.geolocation.getCurrentPosition(position => {
        this.latitud = position.coords.latitude;
        console.log(this.latitud)
        this.longitud = position.coords.longitude;
        console.log(this.longitud)
      });
  }

  goToMaps(lat, lng){
    console.log("TODO: redireccionar a google maps", lat, lng);
  }
 


}
