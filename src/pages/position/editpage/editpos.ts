import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from "@angular/core";
import { NavController, LoadingController, AlertController, NavParams } from "ionic-angular";
import { FormBuilder, Validators, FormGroup } from "@angular/forms/";

@Component({
    templateUrl: "editpos.html"
})

export class EditPositionPage {
    editPositionForm: FormGroup;
    oldPosName: string;
    posId: string;
    posName: string;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public http: Http, public alertCtrl: AlertController
    , public navParams: NavParams, public loading: LoadingController){
        this.editPositionForm = formBuilder.group({
            posName: ['', Validators.compose([Validators.required])]
        });
    }

    ionViewDidEnter(){
        this.oldPosName = this.navParams.get('posName')
        this.posId = this.navParams.get('posId');
        // console.log(this.navParams.get('posId'));
        this.editPositionForm.controls['posName'].setValue(this.oldPosName);
    }

    editPos(){
        if (this.posName == "") {
            alert('error');
        } else {
            let parameter = JSON.stringify({
                posId: this.posId,
                posName: this.posName
            });
            let config = new RequestOptions({
                headers: new Headers({ 'Content-Type': 'application/json'})
            });
            let loading = this.loading.create({
                content: 'Processing...'
            });
            loading.present();
            this.http.post('http://10.8.104.90:9810/api/position/editposition', parameter, config)
            .subscribe(res => {
                loading.dismiss();
                this.successAlert(this.posName);
            })
        }
    }

    successAlert(data: string) {
        let alert = this.alertCtrl.create({
            title: 'Success !',
            message: this.oldPosName + ' successfully changed into ' + data + '.',
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