import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms/";
import { Component } from '@angular/core';

@Component({
    templateUrl: "addpos.html"
})
export class AddPositionPage {
    posName: string;
    addPositionForm: FormGroup;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public http: Http, public alertCtrl: AlertController){
        this.addPositionForm = formBuilder.group({
            posName: ['', Validators.compose([Validators.required])]
        });
    }

    // ionViewDidLoad(){
    //     alert('loaded !');
    // }

    savePos(){
        if (this.posName == "") {
            alert('error');
        } else {
            let parameter = JSON.stringify({
                posName: this.posName
            });
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let alert = this.alertCtrl.create({
                title: 'Confirmation',
                message: 'Add this position ? "' + this.posName + '"',
                buttons: [
                    {
                        text: 'Add',
                        role: 'add',
                        handler: () => {
                            this.http.post('http://10.8.104.90:9810/api/position/addposition', parameter, options)
                            .subscribe(res => {
                                this.successAlert(this.posName);
                            });
                        }
                    },
                    {
                        text: 'Discard',
                        role: 'discard',
                        handler: () => {

                        }
                    }
                ]
            });
            alert.present();
        }
    }

    successAlert(data: string) {
        let alert = this.alertCtrl.create({
            title: 'New Position Added !',
            message: data + ' successfully added !',
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    } 
}