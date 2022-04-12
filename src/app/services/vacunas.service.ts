import { Injectable } from '@angular/core';
import { LibretaInterface } from '../models/libreta';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class VacunasService {

  constructor(public afs: AngularFirestore) { }

  bringVacuna(tmp: string) {   //que traiga toda la informacion de esa vacuna
    return this.afs.collection('vacunas').doc(tmp).valueChanges();
  }
  
  traerVacunas(){
    let db, c = 0, datos: any = [];
    this.afs.collection('vacunas').get().subscribe(res => {
      db = res;
      db.forEach(doc => {
        datos[c] = doc.data();
        datos[c].id = doc.id;
        c++;
      });
    })
    return datos; 
  }
  buscarVacuna(vacunaId: string){
    return this.afs.collection('vacunas').doc(vacunaId).valueChanges();
  }
}
