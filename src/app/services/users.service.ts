import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Observable<UserInterface[]>;

  constructor(public afs: AngularFirestore) {}

  // registrar nuevo usuario en la app
  addUser(user: string, id: string) {
    this.afs.collection('users').doc(id).set(user);
  }

  // buscas usuario de la app
  bringUser(uid: string) {
      return this.afs.collection('users').doc(uid).valueChanges();      
  }

  //traes un usario por el mail que registro, usado en transferir libreta
  searchByEmail(mail: string){
    return new Promise((resolve, reject) => {
      this.afs.collection('users', res => res.where('mail', '==', mail)).get().subscribe( res => {
        if(res.docs.length === 0){
          err => reject(err);
        }
        let user; 
        user = res.docs[0].data()
        user.id = res.docs[0].id;
        resolve(user)
      })
    })
  }
  
}

