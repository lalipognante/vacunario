import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent} from '@zxing/ngx-scanner';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  constructor() { }

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  ngOnInit() {
  }

  doSomething() {
    return this.scanner.enabled;
  }

}
