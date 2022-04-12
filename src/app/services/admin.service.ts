import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public afs: AngularFirestore) { }

  searchAdmin(uid: string) {
    return this.afs.collection('admin').doc(uid).valueChanges();
  }

  bringAllUs() {
    let usuarios = [];
    let c = 0;
    this.afs.collection('cds', 
    res => res.where('activo','==', true).orderBy('apellido'))
    .get().subscribe( res => {
      res.forEach(doc => {
        usuarios.push(doc.data())
        usuarios[c].id = doc.id;
        c++;
      })
    })
    return usuarios;
  }
  

  bringAllCen() {
    let centros = [];
    let c = 0;
    this.afs.collection('centro').get().subscribe( res => {
      res.forEach(doc => {
        centros.push(doc.data())
        centros[c].id = doc.id;
        c++;
      })
    })
    return centros;
  }

  updateCenter(data: any, uid: string) {
    if(data.dirCambio) {
      this.afs.collection('centro').doc(uid).update({
        'nombre': data.nombre,
        'geolocalizacion': data.geolocalizacion,
        'direccion': data.direccion
    })
    } else {
      this.afs.collection('centro').doc(uid).update({
        'nombre': data.nombre,
    })
  }

}
}