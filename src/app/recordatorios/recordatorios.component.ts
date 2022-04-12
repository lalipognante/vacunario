import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { LibretasService } from '../services/libretas.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { SortbypipeComponent } from '../sortbypipe/sortbypipe.component';
import { GroupbypipeComponent } from '../groupbypipe/groupbypipe.component';
import {  MatExpansionModule, MatButtonModule } from '@angular/material';
import { FiltroRecordatoriosPipe } from '../filtro-recordatorios.pipe';
import { MapsService } from '../services/maps.service';
import { GoogleMapComponent } from '../google-map/google-map.component';




@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.scss']
})
export class RecordatoriosComponent implements OnInit {
  xpandStatus=true;


  constructor(public authService: AuthService,
              private userService: UsersService,
              private libretasService: LibretasService,
              private router: Router
  ) { 
  }
  date;
  edadHijo
  usuario;
  librets;
  hayLibrets: boolean = true;
  vacunas;
  horaHoy;
  saludo;
  vacuna;
  momentoHoy;
  collectionRecordatorios = [];
  vacunasWarn;
  vacunasSinColocar = [];
  isLoaded: boolean = false;
  warnArray = [];
  state = ['warn', 'now', 'next']
  stateTest = this.state[0]
  orderedByState: any
  titles = {
    "warn": "Vencidas",
    "now": "Este Mes",
    "next": "Próximo Mes"
  }

  ngOnInit() {
    this.authService.getCurrentUser().then( res => {
      const tmp: string = res.toString();

        // traer toda la info del usuario despues de tener su id
        this.userService.bringUser(tmp).subscribe( res1 => {
        this.usuario = res1;
        this.isLoaded = true;

        })
          this.collectionRecordatorios = [];        
          
        // traer todas las libretas que tiene el usuario.
          this.libretasService.bringLibretas(tmp).subscribe(res2 => {
          this.librets = res2;
          this.isLoaded = true;
          
          if(res2.length === 0){
            this.hayLibrets = false;

          }
          
          //saludo según hora actual
          this.horaHoy = moment().format('h');
          this.momentoHoy = moment().format('a');
          // console.log('momento hoy:',this.momentoHoy)
          if (this.momentoHoy == 'pm'){
            if (this.horaHoy >= 0 && this.horaHoy < 9 ){
              this.saludo = "Buenas tardes";
            }
            if (this.horaHoy >= 9 && this.horaHoy < 12){
              this.saludo = "Buenas noches";
            }
            if (this.horaHoy == 12){
              this.saludo = "Buenas tardes";
            }
          }
          if (this.momentoHoy == 'am'){
            if (this.horaHoy >= 0 && this.horaHoy < 6){
              this.saludo = "Buenas noches";
            }
            if (this.horaHoy == 12){
              this.saludo = "Buenas noches";
            }
            if (this.horaHoy >= 6 && this.horaHoy <= 12){
              this.saludo = "Buenos días";
            }
          }

          //calcular edad de hijo con respecto a hoy
          for (const libret of this.librets){
            let t2=moment(); //ahora  
            let t1=moment(libret.fechaNacimiento.toDate());
            let edadHijo = t2.diff(t1,'month');
       //traer solo las vacunas que no esten colocadas
        this.libretasService.bringVacunas(libret.dni).subscribe( res => {
          this.vacunas = res;
          let recordatorios  = {
            next:[], warn:[], now:[] 
          };

          for (const vacuna of this.vacunas) {
            
            if ((edadHijo - vacuna.edad) <= environment.appConfig.ventanaEdad && vacuna.colocada == false) {  //ventana de vacunas a recordar 
              //vacuna esta pasada?
              if (vacuna.edad < edadHijo){
                vacuna.warn = true;
                recordatorios.warn.push(vacuna);
              }
              //vacuna es de este mes?
              if (vacuna.edad == edadHijo){
                vacuna.now = true;
                recordatorios.now.push(vacuna)
              }
              //vacuna es del proximo mes?
              if (vacuna.edad == (edadHijo + 1)) {
                vacuna.next = true;
                recordatorios.next.push(vacuna)
              }
            }
          }
          this.collectionRecordatorios.push({l:libret,r:recordatorios});
          // console.log('coleccion de rec', this.collectionRecordatorios);
          this.orderedByState = this.state.map( s => {
            return {
              title: s,
              values: this.transform(this.collectionRecordatorios, s)
            }
          });
          // console.log('TE JURO QUE ESTE ANDA:', this.orderedByState);
        });
        }        
        });
    
    }).catch( err => {
      // console.log(err);
      if(err){
        this.router.navigate(['/login'])
      }
    }) 
  }

  transform(recordatorios: any[], estado: string): any[] {
    let salida = []
    // console.log('Recordatorio: ',recordatorios);
    
    recordatorios = recordatorios.filter( uss => {
      if ( !uss.r ) return false
      if ( !uss.r[estado] ) return false
      if ( !uss.r[estado].length ) return false
      return true
    });

    // console.log('estos son los recordatorios:', recordatorios);
  
    recordatorios.forEach( (e: any) => {
      salida.push({ uss: e.l, vacunas: e.r[estado] })
    });

    return salida
  }
}

