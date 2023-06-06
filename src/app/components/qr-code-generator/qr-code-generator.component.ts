import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.css'],
})
export class QrCodeGeneratorComponent {
  options: string[] = [];

  constructor() {
    this.loadQrCodeStrings();
  }

  private loadQrCodeStrings() {
    const randomNumbers = new Uint32Array(25);
    crypto.getRandomValues(randomNumbers);

    for (const [index, value] of randomNumbers.entries()) {
      console.log(value);
      const message = 'Test_message_' + value.toString();
      this.options.push(message);
    }
    console.log(this.options)
  }
}
