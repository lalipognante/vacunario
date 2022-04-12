import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatCardModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatStepperModule } from '@angular/material/stepper';
import { CookieService } from 'ngx-cookie-service';

import { AgmCoreModule } from '@agm/core';



import { MatDialogModule } from '@angular/material/dialog';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AuthGuard } from './auth.guard';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuFooterComponent } from './menu-footer/menu-footer.component';
import { NuevaLibretaComponent } from './nueva-libreta/nueva-libreta.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfigComponent } from './config/config.component';
import { NotifComponent } from './notif/notif.component';
import { PerfilComponent } from './perfil/perfil.component';
import * as geofirex from 'geofirex';




import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { LibretaComponent } from './libreta/libreta.component';
import { RdsLoginComponent } from './rds-login/rds-login.component';
import { RdsHomeComponent } from './rds-home/rds-home.component';
import { RdsEscaneoComponent } from './rds-escaneo/rds-escaneo.component';
import { CdsLoginComponent } from './cds-login/cds-login.component';
import { RdsManualComponent } from './rds-manual/rds-manual.component';
import { CdsHomeComponent } from './cds-home/cds-home.component';
import { CdsInventarioComponent } from './cds-inventario/cds-inventario.component';
import { NuevoInventarioComponent } from './nuevo-inventario/nuevo-inventario.component';
import { QRdialogComponent } from './qrdialog/qrdialog.component';
import { RdsColocarComponent } from './rds-colocar/rds-colocar.component';
import { CdsDetalleComponent } from './cds-detalle/cds-detalle.component';
import { CdsResponsablesComponent } from './cds-responsables/cds-responsables.component';
import { CdsAltaResComponent } from './cds-alta-res/cds-alta-res.component';
import { CdsResponsablesInformacionComponent } from './cds-responsables-informacion/cds-responsables-informacion.component';
import { RdsMigracionComponent } from './rds-migracion/rds-migracion.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GroupbypipeComponent } from './groupbypipe/groupbypipe.component';
import { SortbypipeComponent } from './sortbypipe/sortbypipe.component';
import { MatExpansionModule } from '@angular/material';
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';
import { FiltroRecordatoriosPipe } from './filtro-recordatorios.pipe';
import { VacunaColocadaComponent } from './vacuna-colocada/vacuna-colocada.component';
import { RdsFooterComponent } from './rds-footer/rds-footer.component';
import { RdsColocarViaDniComponent } from './rds-colocar-via-dni/rds-colocar-via-dni.component';
import { PruebaComponent } from './prueba/prueba.component';
import { ChartsComponent } from './charts/charts.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { TranferirComponent } from './tranferir/tranferir.component';
import { ConfirmacionesDialogComponent } from './confirmaciones-dialog/confirmaciones-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminCentrosComponent } from './admin-centros/admin-centros.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';





@NgModule({
  declarations: [
    AppComponent,
    MenuFooterComponent,
    NuevaLibretaComponent,
    LoginComponent,
    RegisterComponent,
    ConfigComponent,
    NotifComponent,
    PerfilComponent,
    HomeComponent,
    LibretaComponent,
    RdsLoginComponent,
    RdsHomeComponent,
    RdsEscaneoComponent,
    RdsManualComponent,
    CdsLoginComponent,
    CdsHomeComponent,
    CdsInventarioComponent,
    NuevoInventarioComponent,
    QRdialogComponent,
    RdsColocarComponent,
    CdsDetalleComponent,
    CdsResponsablesComponent,
    CdsAltaResComponent,
    CdsResponsablesInformacionComponent,
    RdsMigracionComponent,
    GoogleMapComponent,
    GroupbypipeComponent,
    SortbypipeComponent,
    RecordatoriosComponent,
    FiltroRecordatoriosPipe,
    VacunaColocadaComponent,
    RdsFooterComponent,
    RdsColocarViaDniComponent,
    PruebaComponent,
    ChartsComponent,
    RecoveryComponent,
    TranferirComponent,
    ConfirmacionesDialogComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminCentrosComponent,
    AdminUsuariosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    NgxQRCodeModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSnackBarModule,
    MatGridListModule,
    ZXingScannerModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatStepperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA44zeJhgzGewpMDHdWUFyy_oNkDsOrWH8',
    })
  ],
  providers: 
  [
    AuthService, UsersService, AngularFirestore,
    AngularFireStorage, AngularFireStorageModule, AuthGuard,
    CookieService, MenuFooterComponent
  ],

  bootstrap: [AppComponent],

  entryComponents:
  [
    QRdialogComponent, CdsDetalleComponent, 
    CdsAltaResComponent, CdsResponsablesInformacionComponent, 
    RdsColocarComponent, ConfirmacionesDialogComponent
  ],

})
export class AppModule { }

