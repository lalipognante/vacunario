import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(public afs: AngularFirestore) { }

  bringAllLibretas() {
    return this.afs.collection('libretas').valueChanges();
  }

  // bringAllVacunas() {
  //   return this.afs.collection('vacunas', res => res.where("colocada", "==", "true"));
  // }

}
