import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner'
import jsQR from "jsqr";
import { Router } from '@angular/router'
import { RdsColocarComponent } from '../rds-colocar/rds-colocar.component';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-rds-escaneo',
  templateUrl: './rds-escaneo.component.html',
  styleUrls: ['./rds-escaneo.component.scss']
})
export class RdsEscaneoComponent implements OnInit {

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  
  constructor( private router: Router,
                private dialog: MatDialog ) { }

  canvasElement: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  outputContainer: HTMLDivElement;
  outputMessage: HTMLDivElement;
  outputData: HTMLDivElement;
  video: HTMLVideoElement;

  qrcodeDetected: string;

  read: boolean = false;

  ngOnInit() {
    this.canvasElement = <HTMLCanvasElement> document.getElementById('scan-canvas');
    this.canvasContext = this.canvasElement.getContext('2d');
    this.outputContainer = <HTMLDivElement>document.getElementById('output');
    this.outputMessage = <HTMLDivElement>document.getElementById('outputMessage');
    this.outputData = <HTMLDivElement>document.getElementById('outputData');

    this.video = <HTMLVideoElement>document.createElement('video');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: 411, height: 823 } })
    .then(async (stream: MediaStream) => {
        this.video.srcObject = stream;
        this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
        await this.video.play();
        requestAnimationFrame(this.tick.bind(this));
    });
}

drawLine(begin, end, color): void {
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(begin.x, begin.y);
    this.canvasContext.lineTo(end.x, end.y);
    this.canvasContext.lineWidth = 4;
    this.canvasContext.strokeStyle = color;
    this.canvasContext.stroke();
}

tick(): void {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        this.canvasElement.hidden = false;
        this.outputContainer.hidden = false;
        this.canvasElement.height = this.video.videoHeight;
        this.canvasElement.width = this.video.videoWidth;
        this.canvasContext.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
        const imageData: ImageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code&&!this.read) {
            this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
            this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
            this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
            this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
            this.outputMessage.hidden = true;
            this.outputData.parentElement.hidden = false;
            this.read = true;
            this.openDialog(code.data, this.read);
        } else {
            this.outputMessage.hidden = false;
            this.outputData.parentElement.hidden = true;
        }
    }
    requestAnimationFrame(this.tick.bind(this));
}

openDialog(data: any, read: boolean){
const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {data};
    dialogConfig.width = "400px";
            
    this.dialog.open(RdsColocarComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe( res => {
        console.log(res);
        this.read = false;
    })
}

}
