import { Component, OnInit, Inject,ViewChild, NgZone, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-cds-alta-res',
  templateUrl: './cds-alta-res.component.html',
  styleUrls: ['./cds-alta-res.component.scss']
})
export class CdsAltaResComponent implements OnInit {

  rds: FormGroup;
  cds: FormGroup;
  centroId: string;
  sexoOpciones: string[] = ['Masculino', 'Femenino'];
  maxDate;
  isCds: boolean = false;
  isCenter: boolean = false;
  centros: any = [];
  centro;
  isRds: boolean = false;
  
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  addr: any;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<CdsAltaResComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.isRds = data.isRds ? true : false;
      this.isCds = data.isCds ? true : false;
      this.isCenter = data.isCentro ? true : false;
      if (this.isCds) { this.centros = data.centros };
      this.maxDate = moment().subtract(20, 'years').format();
  }

  ngOnInit() {

    if (!this.isCds) {
      this.rds = new FormGroup({
        mail: new FormControl('', [Validators.required, Validators.email]),
        pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        rup: new FormControl('', [Validators.required]),
        nacimiento: new FormControl('', [Validators.required]),
        sexo: new FormControl('', [Validators.required]),
        activo: new FormControl()
      });
    } else {
      this.cds = new FormGroup({
        mail: new FormControl('', [Validators.required, Validators.email]),
        pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required]),
        nacimiento: new FormControl('', [Validators.required]),
        sexo: new FormControl('', [Validators.required]),
        centroId: new FormControl('', [Validators.required]),
        centroNombre: new FormControl(),
        activo: new FormControl()
      });
  }

  if (this.isCenter) {
    this.centro = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      geolocalizacion: new FormControl(''),
      geo: new FormControl(''),
    })
  }

  this.mapsAPILoader.load().then(() => {
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


  
  verifyMail() {
    if (!this.isCds) {
      return this.rds.get('mail');
    } else {
      return this.cds.get('mail');
    }
    
  }
  
  verifyPass(){
    if (!this.isCds) {
      return this.rds.get('pass');
    } else {
      return this.cds.get('pass');
    }
    
  }

  save() {
    if (this.isRds) {
      this.rds.value.activo = true;
      this.rds.value.nacimiento = moment(this.rds.value.nacimiento).format("L")
      this.dialogRef.close(this.rds.value);
    } else if (this.isCds) {
      this.cds.value.activo = true;
      this.cds.value.nacimiento = moment(this.cds.value.nacimiento).format("L")
      this.cds.value.centroNombre = this.cds.value.centroId.nombre;
      this.cds.value.centroId = this.cds.value.centroId.id;
      console.log(this.cds.value)
      this.dialogRef.close(this.cds.value);
    } else if (this.isCenter) {
      this.centro.value.geolocalizacion = new firebase.firestore.GeoPoint(this.latitude, this.longitude)
      this.dialogRef.close(this.centro.value);
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          console.log(results);
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

  
}
