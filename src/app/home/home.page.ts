import { Component } from '@angular/core';
import {Ndef, NFC} from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private nfc: NFC, private ndef: Ndef) { }

  leggiNFC() {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    });
  }


  scriviNFC() {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
      const message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then(
          value => {

          }
      ).catch(
          reason => {
            console.log(reason);
          }
      );
    }, (err) => {
      console.log('error attaching ndef listener', err);
    });

  }
}
