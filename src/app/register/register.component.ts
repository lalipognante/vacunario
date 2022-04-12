import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router} from '@angular/router';
import { switchMap } from 'rxjs/internal/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario: FormGroup;
  maxDate;
  
  constructor(
   public authService: AuthService,
   public userService: UsersService,
   private router: Router,
   private fb: FormBuilder,
  ) { 
    this.maxDate = moment().format();
    
    this.usuario = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      dni: new FormControl(),
      sexo: new FormControl(),
      nacimiento: new FormControl(),
      mail: new FormControl('', [Validators.required, Validators.email]),
    })

    this.usuario = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(6)]],
      nacimiento: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  passErr: boolean;
  tmp;

  verifyMail() {
    return this.usuario.get('mail');
  }

  verifyPass(){
    return this.usuario.get('pass');
  }

  ngOnInit() {
  }

  onSubmitAddUser() {
    let usuariotmp: any = {};
    usuariotmp.nombre = this.usuario.value.nombre;
    usuariotmp.apellido = this.usuario.value.apellido;
    usuariotmp.mail = this.usuario.value.mail;
    usuariotmp.dni = this.usuario.value.dni;
    usuariotmp.nacimiento = this.usuario.value.nacimiento;

    this.authService.register(this.usuario.value.mail, this.usuario.value.pass)
      .then(user => {
        this.tmp = user;
        this.userService.addUser(usuariotmp, this.tmp);
        this.router.navigate(['login']);
      }).catch(err => {
          console.log(err)
          if(err.code === 'auth/weak-password'){
            this.passErr = true;
          }
    });
    //hernan gano un cofre magico
  }
}

