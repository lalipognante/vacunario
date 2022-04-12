import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { LibretaInterface } from '../models/libreta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibretasService {
  private libretasCollection: AngularFirestoreCollection<LibretaInterface>;
  libretas: Observable<LibretaInterface[]>;

  constructor(
    public afs: AngularFirestore,
    public http: HttpClient,
    ) {
    this.libretasCollection = afs.collection<LibretaInterface>('libretas');
    this.libretas = this.libretasCollection.snapshotChanges().pipe(map(
      actions => actions.map( a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    ));
    
  }

  url = 'https://us-central1-vacunario2019.cloudfunctions.net/widgets/libreta/' 

  addLibreta(dni: string, libreta: string) {
    return new Promise((resolve, reject) => {
      this.afs.collection('libretas').doc(dni).set(libreta)
        .then(res => {
          resolve("OK")
        },
        err => reject("err"));
    });
  }

  bringLibretas(uid: string) { //busco todas las libretas que pertenecen a UID
    return this.afs.collection('libretas', res => res.where('users', '==', uid)).valueChanges();
  }

  checkLibreta(id: string) {
    const tmp = this.url + id;
    return new Promise((resolve, reject) => {
      this.http.get(tmp).toPromise().then( res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
    
    
  }

  searchLibreta(id: string) {
    return this.afs.collection('libretas').doc(id).valueChanges();
  }

  bringVacunas(id: string) { //traigo la libreta especifica con id
    return this.afs.collection('libretas').doc(id).collection('vacunas').valueChanges();
  }

  bringUnaVacuna(tmp: string, id: string) { //traigo la vacuna especifica con id
    return this.afs.collection('libretas').doc(id).collection('vacunas').doc(tmp).valueChanges();
  }

  colocarVacuna(vacunaId: string, libretaId: string, datos: object) {
    this.afs.collection('libretas').doc(libretaId).collection('vacunas').doc(vacunaId).update(datos);
  }

  transferirLibreta(lid: string, uid: string) {
    this.afs.collection('libretas').doc(lid).update({users: uid}).then( res => {
      return res;
    }).catch( err => {
      console.log(err);
    })
  }

}
