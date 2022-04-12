import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Campo obligatorio' :
        this.email.hasError('email') ? 'Email no valido' :
            '';
  }
  usuario;
  tmp;

  constructor(private authService: AuthService,
              private userService: UsersService,
              private router: Router
  ) { }

  ngOnInit() {
    this.tmp = this.authService.getAuth();
    this.tmp.then(
    this.userService.bringUser(this.tmp.uid).subscribe( res => {
      this.usuario = res;
    })
  );
  }

  updateChanges() {
    this.router.navigate(['nueva-libreta']);
  }

}
