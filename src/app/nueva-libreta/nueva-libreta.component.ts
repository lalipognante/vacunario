import { Component, OnInit, ViewChild, ElementRef, NgZone, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { LibretasService } from '../services/libretas.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase/app';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmacionesDialogComponent } from '../confirmaciones-dialog/confirmaciones-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-nueva-libreta',
  templateUrl: './nueva-libreta.component.html',
  styleUrls: ['./nueva-libreta.component.scss']
})


export class NuevaLibretaComponent implements OnInit {

  
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  addr: any;
  maxDate;
  private geoCoder;
  
  libreta: FormGroup;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private libretasService: LibretasService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private dialog: MatDialog,
    public fb: FormBuilder,
  ) {

    this.libreta = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      dni: new FormControl(),
      sexo: new FormControl(),
      nacimiento: new FormControl(),
      direccion: new FormControl(),

    })
    this.maxDate = moment().format();
    this.libreta = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(7)]],
      fechaNacimiento: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });

  }

  // libreta: any = {};
  sexoOpciones: string[] = ['Masculino', 'Femenino'];
  tmp;
  

  ngOnInit() {
    this.authService.getCurrentUser().then( res => {
      this.tmp = res;
    })

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      // console.log(results);
      // console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  onSubmitLibreta() {
    let temporalLibreta: any = {};
    temporalLibreta = this.libreta.value;
    temporalLibreta.users = this.tmp;
    temporalLibreta.direccion = new firebase.firestore.GeoPoint(this.latitude, this.longitude)
    temporalLibreta.dni = temporalLibreta.dni.toString()
    this.libretasService.checkLibreta(temporalLibreta.dni).then(res => {
      if(res){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {situacion: "falla2", type: "libreta", texto: "algo salio mal"}
        this.dialog.open(ConfirmacionesDialogComponent, dialogConfig);
        this.dialog.afterOpen.subscribe(res => {
          location.reload();
        })
      }else {
        this.libretasService.addLibreta(temporalLibreta.dni, temporalLibreta).then( res => {
        this._snackBar.open('Libreta creada con exito' , 'Cerrar');
        this.router.navigate(['home']);
      })
    }
  })

  }

}

  


