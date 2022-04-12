import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { LibretasService } from '../services/libretas.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { SortbypipeComponent } from '../sortbypipe/sortbypipe.component';
import {  MatExpansionModule, MatButtonModule } from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  vacunas;
  vacuna;
  hayLibrets: boolean = true;
  vacunasSinColocar = [];
  isLoaded: boolean = false;

  ngOnInit() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    this.date = dd + '/' + mm;

    this.authService.getCurrentUser().then( res => {
      const tmp: string = res.toString();

        // traer toda la info del usuario despues de tener su id
        this.userService.bringUser(tmp).subscribe( res1 => {
        this.usuario = res1;
        })
        
        // traer todas las libretas que tiene el usuario.
        this.libretasService.bringLibretas(tmp).subscribe(res2 => {
        this.librets = res2;
        if(res2.length === 0){
          this.hayLibrets = false;

        }
        this.isLoaded = true;

        //calcular edad de hijo con respecto a hoy
        

        for (const libret of this.librets){
          let t2=moment(); //ahora  
          let t1=moment(libret.fechaNacimiento.toDate());
          let edadHijo = t2.diff(t1,'month');
          // console.log('edad hijo ahora', edadHijo);

       //traer solo las vacunas que no esten colocadas
        this.libretasService.bringVacunas(libret.dni).subscribe( res => {
          this.vacunas = res;
          //console.log('este son todas las vacunas',this.vacunas);
          for (let i = 0; i<this.vacunas.length; i++) {
            
            if (Math.abs (edadHijo - this.vacunas[i].edad) <= environment.appConfig.ventanaEdad && this.vacunas[i].colocada == false) {  //ventana de vacunas a recordar 
              let vacunaFalse = this.vacunas[i];
              //vacuna esta pasada?
              vacunaFalse.warn = (vacunaFalse.edad < edadHijo);
              if (!libret.vacunaFalse){
                libret.vacunaFalse=[];
              }
              libret.vacunaFalse.push(vacunaFalse);
            }
          }
          // console.log('Vacunas sin colocar',libret.vacunaFalse)
        });


  }
});
    
    }).catch( err => {
      if(err){
        this.router.navigate(['/login'])
      }
    }) 

  }

}
