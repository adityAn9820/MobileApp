import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {NavController} from "@ionic/angular";
import { CapacitorSqliteService } from 'Services/capacitor-sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @Output() Click: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController,public alertctrl : AlertController, private sqlservice:CapacitorSqliteService){ }
  ngOnInit(){
    this.sqlservice.testSQLitePlugin();
  }
  onClick(option: string, $event) {
    try {
      let value: any = {
        value: option,
        event: $event
      };
      this.Click.emit(value);
    }
    catch (error) {
      console.error('Exception in onClick() method of MainHeaderComponent. Exception is :: ', error);
    }
  }
 async showPrompt(){
   const promt = await this.alertctrl.create({
     message: "Enter a name",
     inputs: [
       {
         name: 'title',
         placeholder: 'Title'
       }
     ],
     buttons: [
       {
         text: 'Cancle',
         handler: data => {
           console.log("Cancle clicked");
         }
       },
       {
         text: 'Save',
         handler: data => {
           console.log("Saved Clicked");
         }
       }
     ]
   });
   promt.present();
 }

  async CmfrtAlrt(){
  const alrt = await this.alertctrl.create({
    message : "Are you sure!!",
    buttons : [
      {
        text : "Cancle",
        handler : data=> {
          console.log("Cancled");
        }
      },
      {
        text:"Save",
        handler : data=>{
          console.log('Saved!')
        }
      }
    ]
  });
  alrt.present();
 }
}


