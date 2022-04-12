import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

  @Output() change: EventEmitter <string> = new EventEmitter();

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then(userData => resolve(userData.user.uid),
      err => reject(err));
        });
  }

  logIn(email: string, password: string, type:string  ) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => {
          this.change.emit(type);
          resolve(userData)
        },
          err => reject(err));
    });
  }

  logInUid(email: string, password: string, type:string  ) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => {
          this.change.emit(type);
          resolve(userData.user.uid)
        },
          err => reject(err));
    });
  }

  getAuth() {
    return this.afAuth.auth.currentUser;
  }

  getCurrentUser(){
    return new Promise((resolve, reject) => {
      var user = this.afAuth.auth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user.uid);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  passReset(mail: string){
    this.afAuth.auth.sendPasswordResetEmail(mail).then(res => {
      return "200"
    }).catch( err => {
      return "400"
    })
  }


  logout() {
    return this.afAuth.auth.signOut();
  }

  recoverPassword(mail: string) {
    this.afAuth.auth.sendPasswordResetEmail(mail).then(res => {
      return res;
    }).catch( err => {
      console.log(err);

    })
  }
}

