import { Http } from '@angular/http';
// import { RestapiProvider } from './../../providers/restapi/restapi';
import { Component } from "@angular/core";
import { NavController, LoadingController, ActionSheetController, AlertController } from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { AddPositionPage } from "../position/addpage/addpos";

@Component({
    selector: 'page-position',
    templateUrl: 'position.html'
})
export class PositionPage {
    positions: Observable<any>;
    
    constructor(public navCtrl: NavController,
         public alertCtrl: AlertController,
          public http: Http,
           public loading: LoadingController,
            public action: ActionSheetController){
        
    }

    ionViewDidEnter(){
        let loading = this.loading.create({
            content: 'Please Wait...'
        });
        loading.present();
        this.http.get('http://10.8.104.90:9810/api/position/getallpositions').map(res => res.json())
            .subscribe(data => {
                this.positions = data;
                loading.dismiss();
                console.log(this.positions);
            }, err => {
                console.log("Error ! " + err);
            });
    }

    addPosition(){
        this.navCtrl.push(AddPositionPage);
    }

    openMenu(position: string, posId: string) {
        let actionsheet = this.action.create({
            title: position,
            buttons: [
                {
                    text: 'Show Employees',
                    role: 'empList',
                    handler: () => {
                        console.log(position + ' show employees');
                    }
                },
                {
                    text: 'Edit Position',
                    role: 'edit',
                    handler: () => {
                        console.log(position + ' edit position');
                    }
                },
                {
                    text: 'Delete Position',
                    role: 'delete',
                    handler: () => {
                        console.log(position + ' delete position');
                        this.deletePosition(posId, position);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log(position + ' cancel');
                    }
                }
            ]
        });
        actionsheet.present();
    }

    deletePosition(posId: string, posName: string){
        let alert = this.alertCtrl.create({
            title: 'Delete ' + posName + ' ?',
            message: 'This action cannot be undone.',
            buttons: [
                {
                    text: 'Yes, Delete it !',
                    role: 'delete',
                    handler: () => {
                        this.http.post('http://10.8.104.90:9810/api/position/deleteposition?param=' + posId, posId)
                        .subscribe(res => {
                            this.ionViewDidEnter();
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        alert.present();
    }
}