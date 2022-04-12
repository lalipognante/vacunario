import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class RdsService {

  constructor(public afs: AngularFirestore) { }

  //buscar responsable de la salud
  bringRDS(id: string) {
    return this.afs.collection('rds').doc(id).valueChanges();
  }

  addRds(data: any, uid: string) {
    console.log(data);
    this.afs.collection('rds').doc(uid).set({
      'nombre': data.nombre,
      'apellido': data.apellido,
      'rup': data.rup,
      'mail': data.mail,
      'centroId': data.centroId,
      'nacimiento': data.nacimiento,  
      'activo': data.activo
    });
  }

  updateRds(data: any, uid: string){
    this.afs.collection('rds').doc(uid).update({
      'nombre': data.nombre,
      'apellido': data.apellido,
      'rup': data.rup,
      'mail': data.mail,
      'centroId': data.centroId,
      'nacimiento': data.nacimiento,
      'activo': data.activo
    })
  }
}
