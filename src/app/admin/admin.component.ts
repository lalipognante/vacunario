import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AdminCentrosComponent } from '../admin-centros/admin-centros.component';
// import { AdminUsuariosComponent } from '../admin-usuarios/admin-usuarios.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

   
  admin: any = {};
  tmp;
  errMsj: boolean = false;
  errMsj2: boolean = false;

  ngOnInit() {
  }

  usuarios() {
  this.router.navigate(['admin/usuarios']);
  }

  centros() {
  this.router.navigate(['admin/centros']);
  }
}

