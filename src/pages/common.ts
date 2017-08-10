import { Http } from '@angular/http';
import { AlertController } from "ionic-angular";

export class Common {
    constructor(public http: Http, public alertCtrl: AlertController){

    }

    confirmAlert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        
                    }
                }
            ]
        });
        alert.present();
    } 
}