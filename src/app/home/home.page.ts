import { Component } from '@angular/core';
import {Ndef, NFC} from '@ionic-native/nfc/ngx';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private nfc: NFC, private ndef: Ndef, private alertController: AlertController) { }

  readNFC() {
    this.nfc.addNdefListener(() => {
      this.presentAlert('ok');
    }, (err) => {
      this.presentAlert('ko' + err);
    }).subscribe((event) => {
      console.log(event);
      console.log(JSON.stringify(event));

      this.presentAlert('Il messaggio contiene' + event.tag + ' ' + this.nfc.bytesToHexString(event.tag.id));
    });

  }


  scriviNFC() {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
      const message = this.ndef.textRecord('Hello world');
      this.nfc.share([message]).then(
          value => {
            this.presentAlert('ok');
          }
      ).catch(
          reason => {
            this.presentAlert('ko');
          }
      );
    }, (err) => {
      this.presentAlert('ko' + err);
    });

  }


  async presentAlert(mess) {
    const alert = await this.alertController.create({
      header: 'attenzione',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }
}
