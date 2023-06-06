import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { DndDropEvent } from 'ngx-drag-drop';

type QrInfo = {
  name: string;
  value: string;
}
type QrScannedType = {
  id: string
  data: QrInfo;
}

@Component({
  selector: 'app-map-qr',
  templateUrl: './map-qr.component.html',
  styleUrls: ['./map-qr.component.css'],
})


export class MapQrComponent implements AfterViewInit {

  options: QrInfo[] = [];
  cubicles: QrScannedType[] = [];
  // draggable = {
  //   // note that data is handled with JSON.stringify/JSON.parse
  //   // only set simple data or POJO's as methods will be lost
  //   data: "myDragData",
  //   effectAllowed: "all",
  //   disable: false,
  //   handle: false
  // };

  constructor() {
    // this.initDragItems();
    for (let index = 0; index < 9; index++) {

      this.cubicles.push({ id: (index + 1).toString(), data: { name: '', value: '' } })
    }
  }

  ngAfterViewInit(): void {
    this.modifyQrStringArray([]);
  }

  private getRandomNumbers() {
    const randomNumbers = new Uint32Array(10);
    crypto.getRandomValues(randomNumbers);

    for (const [index, value] of randomNumbers.entries()) {
      console.log(value);
      this.options.push({ name: value.toString(), value: (index + 1).toString() });
    }
  }

  private getRandomInt(min: number, max: number): number {
    // Create byte array and fill with 1 random number
    var byteArray = new Uint32Array(1);
    crypto.getRandomValues(byteArray);

    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
      return this.getRandomInt(min, max);
    return min + (byteArray[0] % range);
  }

  onDragover(event: DragEvent) {
    // console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent, itemId: string) {
    // console.log("dropped", itemId, event.data);

    this.insertQrToArray(itemId, event.data);
  }

  private insertQrToArray(itemId: string, incomingQrData: any | QrInfo) {
    let filteredList = this.cubicles.filter(item => item.id === itemId);
    if (filteredList.length) {
      filteredList[0].data = incomingQrData;
    }
  }

  handleApplyButton($event: any) {
    console.log(this.cubicles);
    console.log(JSON.stringify(this.cubicles));
  }

  handleQrCodeList(qrCodes:string[]){
    console.log({qrCodes});
    this.modifyQrStringArray(qrCodes);
  }

  private modifyQrStringArray(qrCodes:string[]) {
    let tempQrCodes = [];

    for (const [index, value] of qrCodes.entries()) {
      tempQrCodes.push({ name: value.toString(), value: (index + 1).toString() });
    }

    this.options = tempQrCodes;
  }

}
