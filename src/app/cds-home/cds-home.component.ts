import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CdsService } from '../services/cds.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { InventarioService } from '../services/inventario.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmacionesDialogComponent } from '../confirmaciones-dialog/confirmaciones-dialog.component';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-cds-home',
  templateUrl: './cds-home.component.html',
  styleUrls: ['./cds-home.component.scss']
})
export class CdsHomeComponent implements OnInit {
  xpandStatus = true;

  constructor(private authService: AuthService,
    private cdsService: CdsService,
    private router: Router,
    private http: HttpClient,
    private inventarioService: InventarioService,
    private dialog: MatDialog,
    private cookieService: CookieService,
    ) { }


  cid;
  centro;
  isLoaded: boolean = false;
  url = 'https://us-central1-vacunario2019.cloudfunctions.net/widgets/libretas'
  LineChart = [];
  cdsId;
  cdsDatos;
  stock;
  stocks;
  sinStock;
  ventanaStock;
  horaHoy;
  saludo;
  momentoHoy;
  vacunas;
  st;

  ngOnInit() {
    //saludo según hora actual
    this.horaHoy = moment().format('h');
    this.momentoHoy = moment().format('a');
    if (this.momentoHoy == 'pm') {
      if (this.horaHoy >= 0 && this.horaHoy < 9) {
        this.saludo = "Buenas tardes";
      }
      if (this.horaHoy >= 9 && this.horaHoy < 12) {
        this.saludo = "Buenas noches";
      }
    }
    if (this.momentoHoy == 'am') {
      if (this.horaHoy >= 0 && this.horaHoy < 6) {
        this.saludo = "Buenas noches";
      }
      if (this.horaHoy == 12) {
        this.saludo = "Buenas noches";
      }
      if (this.horaHoy >= 6 && this.horaHoy < 12) {
        this.saludo = "Buenos días";
      }
    }
      //conseguir usuario del centro
      const res = this.cookieService.get('cid');

    if(res){
      this.cdsService.searchUser(res.toString()).subscribe(user => {
        this.cid = user;
        //conseguir el centro
        this.cdsService.searchCentro(this.cid.centroId).subscribe(centro => {
          this.centro = centro;
          this.isLoaded = true;
          //recuperar todo el stock
          this.ventanaStock = 20;
          this.inventarioService.getStock(this.cid.centroId).subscribe(stock => {
            this.stock = stock;
            // console.log('este es el stock', this.stock);
            let avisos = {
              rojo: [], amarillo: [], verde: []
            };
            for (const st of this.stock) {
              if (st.cantidad <= 10) {
                st.rojo = true;
                avisos.rojo.push(st);
              }
              if (st.cantidad > 10 && st.cantidad <= 20) {
                st.amarillo = true;
                avisos.amarillo.push(st);
              }
              if (st.cantidad > 20) {
                st.verde = true;
                avisos.verde.push(st);
              }
              this.st = st;
            }
          })
        })
      })
    }else {
      this.router.navigate(['cds']);
    }



    this.http.get(this.url).toPromise().then(res => {
      this.vacunas = res;
      console.log('respuesta:', this.vacunas)
      let grouped = _.groupBy(this.vacunas, 'mm');
      console.log('agrupar:', grouped)


    }).catch(err => {
      console.log(err);
    })

    let FECHAHOY = moment().format('l');
    console.log('FECHAHOY:', FECHAHOY)
    // let grouped = _.groupBy(this.vacunas, 'mm');
    // console.log('agrupar:',grouped)



    // Line chart:
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ["Ene", "Feb", "Marz", "Abril", "May", "Jun", "Jul", "Agos", "Sep", "Oct", "Nov", "Dic"],
        datasets: [{
          label: 'vacunas',
          data: [9, 7, 3, 5, 2, 25, 15, 16, 19, 3, 1, 9],
          fill: true,
          lineTension: 0.2,
          borderColor: "#007bff",
          borderWidth: 1.5
        }]
      },
      options: {
        title: {
          text: "Cantidad de vacunas colocadas al mes",
          display: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Por Mes'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Cantidad de vacunas'
            }
          }]
        }
      }
    });

  }

  inventario() {
    this.router.navigate(['cds/inventario'])
  }

  responsables() {
    const tmp = 'cds/' + this.cid.centroId + '/responsables';
    this.router.navigate([tmp])
  }

  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;       
    dialogConfig.data = {'type': 'logoutCds'};
    dialogConfig.width = "400px";
    this.dialog.open(ConfirmacionesDialogComponent, dialogConfig);
  }

}
