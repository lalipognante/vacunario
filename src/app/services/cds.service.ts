import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CdsService {

  constructor(public afs: AngularFirestore) { }

  searchUser(uid: string) {
    return this.afs.collection('cds').doc(uid).valueChanges();
  }

  searchCentro(cid: string) {
    return this.afs.collection('centro').doc(cid).valueChanges();
  }
  
  bringAllByCentro(id: string) {
    return this.afs.collection('rds', res => res
    .where('centroId', '==', id)
    .where('activo','==', true)
    .orderBy('apellido'))
    .get();
  }

  addCds(data: any, uid: string) {
      console.log(data);
      this.afs.collection('cds').doc(uid).set({
        'nombre': data.nombre,
        'apellido': data.apellido,
        'dni': data.dni,
        'mail': data.mail,
        'centroId': data.centroId,
        'centroNombre': data.centroNombre,
        'nacimiento': data.nacimiento,  
        'activo': data.activo
      });
  }

  updateCds(data: any, uid: string) {
      this.afs.collection('cds').doc(uid).update({
        'nombre': data.nombre,
        'apellido': data.apellido,
        'dni': data.dni,
        'mail': data.mail,
        'centroId': data.centroId,
        'centroNombre': data.centroNombre,
        'nacimiento': data.nacimiento,
        'activo': data.activo
    })
  }

  addCenter(data: any) {
    this.afs.collection('centro').add({
      'nombre': data.nombre,
      'geolocalizacion': data.geolocalizacion,
      'direccion': data.direccion,
    })
  }
}