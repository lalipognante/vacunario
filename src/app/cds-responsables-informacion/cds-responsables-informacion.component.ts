import { Component, OnInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { RdsService } from '../services/rds.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ConfirmacionesDialogComponent } from '../confirmaciones-dialog/confirmaciones-dialog.component';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-cds-responsables-informacion',
  templateUrl: './cds-responsables-informacion.component.html',
  styleUrls: ['./cds-responsables-informacion.component.scss']
})
export class CdsResponsablesInformacionComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  addr: any;
  private geoCoder;

  

  constructor(
    public dialogRef2: MatDialogRef<ConfirmacionesDialogComponent>,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<CdsResponsablesInformacionComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
     if (data.isCds === true){
        this.isCds = data.isCds;
        this.cds = data.cds;
        this.cid = data.cds.id;
      } else if (data.isCenter === true) {
        console.log(data);
        this.isCenter = data.isCenter;
        this.center = data.center;
        this.centerid = data.center.id;
      } else if (data.isRds === true) {
        this.isRds = data.isRds;
        this.rds = data.rds;
        this.id = data.rds.id;
      }
  }

  id;
  isCenter: boolean = false;
  center: FormGroup;
  centerid;
  rds: FormGroup;
  centroId: string;
  isCds: boolean = false;
  isRds: boolean = false;
  cds: FormGroup;
  cid;
  dirSi: boolean = false;

  ngOnInit() {
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

  saveRDS() {
    this.rds['id'] = this.id
    this.dialogRef.close(this.rds);
    let snackBarRef = this._snackBar.open('✓ Cambios guardados con éxito', 'Recargar',
      {
        duration: 2500,
        //verticalPosition: 'top',
        panelClass: ['blue-snackbar'],
      });
    snackBarRef.onAction().subscribe(() => {
      location.reload()
    });
  }

  saveCDS() {
    this.cds['id'] = this.cid
    this.dialogRef.close(this.cds);
    let snackBarRef = this._snackBar.open('✓ Cambios guardados con éxito', ' ',
      {
        duration: 2500,
        //verticalPosition: 'top',
        panelClass: ['blue-snackbar'],
      });
    snackBarRef.onAction().subscribe(() => {
      location.reload()
    });
  }

  saveCenter() {
    this.center['id'] = this.centerid
    this.center['dirCambio'] = false;
    if(this.dirSi) {
      this.center['dirCambio'] = true;
      this.center['geolocalizacion'] = new firebase.firestore.GeoPoint(this.latitude, this.longitude);
    }
    this.dialogRef.close(this.center);
    let snackBarRef = this._snackBar.open('✓ Cambios guardados con éxito', ' ',
      {
        duration: 2500,
        //verticalPosition: 'top',
        panelClass: ['blue-snackbar'],
      });
    snackBarRef.onAction().subscribe(() => {
      location.reload()
    });
  }


  exit() {
    this.dialogRef.close();
  }

  eliminarRDS() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { 'type': 'deleteRDS', 'rds': this.rds };
    dialogConfig.width = "400px";
    this.dialog.open(ConfirmacionesDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.dialog.closeAll();
    })

  }

  eliminarCDS() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { 'type': 'deleteCDS', 'cds': this.cds };
    dialogConfig.width = "400px";
    this.dialog.open(ConfirmacionesDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.dialog.closeAll();
    })

  }

  cambiarPassRDS(m: string) {
    this.authService.passReset(m);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { 'type': 'cambiarPassRDS', 'rds': this.rds };
    dialogConfig.width = "400px";
    this.dialog.open(ConfirmacionesDialogComponent, dialogConfig);
  }

  cambiarPassCDS(m: string) {
    this.authService.passReset(m);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { 'type': 'cambiarPassCDS', 'cds': this.cds };
    dialogConfig.width = "400px";
    this.dialog.open(ConfirmacionesDialogComponent, dialogConfig);
  }

}
