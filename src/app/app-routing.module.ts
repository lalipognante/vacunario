import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaLibretaComponent } from './nueva-libreta/nueva-libreta.component';
import { LoginComponent } from  './login/login.component';
import { RegisterComponent } from  './register/register.component';
import { ConfigComponent } from './config/config.component';
import { NotifComponent }  from './notif/notif.component';
import { PerfilComponent }  from './perfil/perfil.component';
import  { HomeComponent } from './home/home.component';
import { LibretaComponent } from './libreta/libreta.component';
import { RdsLoginComponent } from './rds-login/rds-login.component';
import { RdsHomeComponent } from './rds-home/rds-home.component';
import { RdsEscaneoComponent } from './rds-escaneo/rds-escaneo.component';
import { CdsLoginComponent } from './cds-login/cds-login.component';
import { RdsManualComponent } from './rds-manual/rds-manual.component';
import { CdsHomeComponent } from './cds-home/cds-home.component';
import { CdsInventarioComponent } from './cds-inventario/cds-inventario.component';
import { NuevoInventarioComponent } from './nuevo-inventario/nuevo-inventario.component';
import { RdsColocarComponent } from './rds-colocar/rds-colocar.component';
import { CdsResponsablesComponent } from './cds-responsables/cds-responsables.component';
import { RdsMigracionComponent } from './rds-migracion/rds-migracion.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';
import { VacunaColocadaComponent } from './vacuna-colocada/vacuna-colocada.component';
import { RdsColocarViaDniComponent } from './rds-colocar-via-dni/rds-colocar-via-dni.component';
import { PruebaComponent } from './prueba/prueba.component';
import { ChartsComponent } from './charts/charts.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { TranferirComponent } from './tranferir/tranferir.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCentrosComponent } from './admin-centros/admin-centros.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';





const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'config',
    component: ConfigComponent
  },
  {
    path: 'notif',
    component: NotifComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'nueva-libreta',
    component: NuevaLibretaComponent
  },
  {
    path: 'recordatorios',
    component: RecordatoriosComponent
  },
  {
    path: 'libreta/:libretaId',
    component: LibretaComponent
  },
  {
    path: 'rds',
    component: RdsLoginComponent
  },
  {
    path: 'rds/home',
    component: RdsHomeComponent,
  },
  {
    path: 'rds/scan',
    component: RdsEscaneoComponent
  },
  {
    path: 'rds/manual',
    component: RdsManualComponent
  },
  {
    path: 'cds',
    component: CdsLoginComponent
  },
  {
    path: 'cds/home',
    component: CdsHomeComponent
  },
  {
    path: 'cds/inventario',
    component: CdsInventarioComponent
  },
  {
    path: 'cds/nuevo-inventario',
    component: NuevoInventarioComponent
  },
  {
    path: 'rds/:libretaId/:vacunaId',
    component: RdsColocarComponent
  },
  {
    path: 'cds/:id/responsables',
    component: CdsResponsablesComponent
  },
  {
    path: 'rds/migracion',
    component: RdsMigracionComponent
  },
  {
    path: 'googlemap/:vacunaId',
    component: GoogleMapComponent
  },
  {
    path: ':libretaId/vacunaColocada/:vacunaId',
    component: VacunaColocadaComponent
  },
  {
    path: 'rds/via-dni',
    component: RdsColocarViaDniComponent
  },
  {
    path: 'rds/prueba',
    component: PruebaComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'transferir',
    component: TranferirComponent
  },
  {
    path: 'admin',
    component: AdminLoginComponent
  },
  {
    path: 'admin/home',
    component: AdminUsuariosComponent
  },
  {
    path: 'admin/centros',
    component: AdminCentrosComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
