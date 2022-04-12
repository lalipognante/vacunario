import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private afs: AngularFirestore){}

  getStock(cid: string){
    return this.afs.collection('centro').doc(cid).collection('stock').valueChanges();
  }

  updateStock(cid: string, stock: any = []){
    let db, datos: any = [], c = 0;
    this.afs.collection('centro').doc(cid).collection('stock').get().subscribe(res => {
      db = res;
      db.forEach(doc => {
        datos[c] = doc.data();
        c++; 
      });

      for(let i=0; i<stock.length; i++){
        for(let j=0; j<datos.length; j++){
          if(stock[i].id === datos[j].id){
            let s, l;
            s = stock[i].cantidad;
            l = datos[j].cantidad
            datos[j].cantidad = s+l;
            this.afs.collection('centro')
            .doc(cid).collection('stock')
            .doc(datos[j].id)
            .update({
              'cantidad': datos[j].cantidad
            })
          }
        }
      } 
    })
  }

  discountVacuna(vId: string, cId: string, cantidad: number){
    let vacuna, q;
    this.afs.collection('centro').doc(cId).collection('stock').doc(vId).get().subscribe(res => {
      vacuna = res.data(); 
      q = vacuna.cantidad-cantidad;
      this.afs.collection('centro').doc(cId).collection('stock').doc(vId).update({'cantidad': q})
    })
  }


  

  // getAllInventarios(cid: string){ 
  //   return this.inventarios = this.afs.collection('centro').doc(cid).collection('recibidas').snapshotChanges()
  //   //mapeo de documentos para agregar el id 
  //   .pipe(map(changes=> {
  //     return changes.map(action => {
  //       const data = action.payload.doc.data() as InventarioInterface; 
  //       data.id = action.payload.doc.id;
  //       return data;
  //     });
  //   }));
  // }

  // getOneInventario(idInventario: string, cid: string){
  //   const res = this.afs.collection('centro')
  //               .doc(cid).collection('recibidas')
  //               .doc(idInventario).collection('vacunas')
  //               .valueChanges();
  //   return res;
  // }

  // addInventario(cid:string, vacunas: object, datosExtra: object): void{

  //   //generamos primero la collecion dentro de recibidas
  //   this.afs.collection('centro').doc(cid).collection('recibidas').add(datosExtra).then( res => {

  //     // vamos recorriendo cada vacuna dentro del json 
  //     // y las vamos agregando como docs individuales dentro de 'recibidas'
  //     let key;
  //     for(key in vacunas){
  //     this.afs.collection('centro').doc(cid).collection('recibidas').doc(res.id)
  //             .collection('vacunas').doc(vacunas[key].id)
  //             .set({'nombre': vacunas[key].nombre, 'cantidad': vacunas[key].cantidad})
  //     }
  //   }).catch( err => {
  //     console.log('error en addInventario', err)
  //   })
  // }

}