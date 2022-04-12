import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(public afs: AngularFirestore,
              public http: HttpClient,
  ) {}

  

  bringAllCentros() {
    return this.afs.collection('centro').valueChanges();
  }

  bringCentroCVacuna(vid: string){
    const url = 'https://us-central1-vacunario2019.cloudfunctions.net/widgets/centro/stock/' 
    const tmp = url + vid;

      return new Promise((resolve, reject) => {
      this.http.get(tmp).toPromise().then( res => {
        resolve(res);
      }).catch( err => {
        reject(err);
      })
    })
    
  }


}
