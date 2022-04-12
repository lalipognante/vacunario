import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibretasService } from '../services/libretas.service'
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-tranferir',
  templateUrl: './tranferir.component.html',
  styleUrls: ['./tranferir.component.scss']
})
export class TranferirComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private libretasServices: LibretasService,
  ) { }

  user;
  destUserMail;
  newUs;
  libretas;
  lib;
  errMsj: boolean = false;
  isLoaded: boolean = false;
  isLoaded2: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.authService.getCurrentUser().then( res => {
      this.user = res;
        this.libretasServices.bringLibretas(this.user).subscribe( res => {
          this.libretas = res;
      })
    })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  searchNewUser(stepper: MatStepper){
    this.destUserMail = this.firstFormGroup.value.firstCtrl;
    this.userService.searchByEmail(this.destUserMail).then( res => {
      this.newUs =  res;
      stepper.next();
      this.isLoaded = true;
    }).catch( err => {
      console.log(err);
      this.errMsj = true;
    })
  }

  libreta(){
    this.lib = this.secondFormGroup.value.secondCtrl
    this.isLoaded2 = true;
  }

  transferir(){
    this.libretasServices.transferirLibreta(this.lib.dni, this.newUs.id);
  }

}


