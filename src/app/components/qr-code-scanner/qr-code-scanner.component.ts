import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeDevice, ScannerQRCodeResult, ScannerQRCodeSelectedFiles, ScannerQRCodeSymbolType } from 'ngx-scanner-qrcode';
import { delay } from 'rxjs';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css'],
})
export class QrCodeScannerComponent {

  public config: ScannerQRCodeConfig = {
    // fps: 1000,
    vibrate: 400,
    // isBeep: false,
    // decode: 'macintosh',
    constraints: {
      video: {
        width: window.innerWidth // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      }
    },
    // canvasStyles: {
    //   font: '17px serif',
    //   lineWidth: 1,
    //   fillStyle: '#ff001854',
    //   strokeStyle: '#ff0018c7',
    // } as any // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  @Output() onScan = new EventEmitter<string[]>();

  constructor(private qrCode: NgxScannerQrcodeService) { }

  ngAfterViewInit(): void {
    this.action.isReady.pipe(delay(1000)).subscribe(() => {
      this.handle(this.action, 'stop');
    });
  }

  public onEvent(results: ScannerQRCodeResult[], action?: any): void {
    results?.length && action && action.pause(); // Detect once and pause scan!
    console.log(results);

    if (results.length) {
      let values = [];
      const filteredQrCodeArray = results.filter(result => result.type === ScannerQRCodeSymbolType.ScannerQRCode_QRCODE)
      for (const [index, result] of filteredQrCodeArray.entries()) {
        const qrCodeValue = result.value;
        values.push(qrCodeValue);
      }
      this.onScan.emit(values);
      this.handle(action, 'stop');
    }
  }
  public onEventImageScanner(e: ScannerQRCodeResult[]): void {
    console.log(e);
    // this.onScanComplete.emit([]);
  }

  public handle(action: any, fn: 'start' | 'stop' | 'play' | 'pause' | 'torcher' | 'download'): void {
    if (fn === 'start') {
      const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
        // front camera or back camera check here!
        const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
        action.playDevice(device ? device.deviceId : devices[0].deviceId);

      }
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public onSelects(files: any): void {
    this.qrCode.loadFiles(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;

    });
  }

  public onSelects2(files: any): void {
    this.qrCode.loadFilesToScan(files, this.config).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      console.log(res);
      this.qrCodeResult2 = res;
    });
  }
}
