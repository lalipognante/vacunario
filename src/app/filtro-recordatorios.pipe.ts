import { Pipe, PipeTransform } from '@angular/core';
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';

@Pipe({
  name: 'filtroRecordatorios'
})
export class FiltroRecordatoriosPipe implements PipeTransform {

  transform(recordatorios: any[], estado: string): any[] {
    let salida = []
    console.log('Recordatorio: ',recordatorios);
    
    recordatorios = recordatorios.filter( uss => {
      if ( !uss.r ) return false
      if ( !uss.r[estado] ) return false
      if ( !uss.r[estado].length ) return false
      return true
    });

    console.log('estos son los recordatorios:', recordatorios);
    

    recordatorios.forEach( (e: any) => {
      salida.push({ uss: e.l, vacunas: e.r[estado] })
    });

    return salida
  }

}
