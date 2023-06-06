import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { QrCodeModule } from 'ng-qrcode';
import { DndModule } from 'ngx-drag-drop';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

import { AppComponent } from './app.component';
import { MapQrComponent } from './components/map-qr/map-qr.component';
import { QrCodeGeneratorComponent } from './components/qr-code-generator/qr-code-generator.component';
import { QrCodeScannerComponent } from './components/qr-code-scanner/qr-code-scanner.component';

@NgModule({
  declarations: [
    AppComponent, MapQrComponent, QrCodeGeneratorComponent, QrCodeScannerComponent,
  ],
  imports: [
    BrowserModule,
    QrCodeModule,
    NgxScannerQrcodeModule,
    DndModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
