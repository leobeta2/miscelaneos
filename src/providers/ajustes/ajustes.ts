import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

import { Platform } from "ionic-angular";
/*
  Generated class for the AjustesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AjustesProvider {

  ajustes = {
    mostrar_tutorial: true
  }

  constructor(private storage: Storage, private platform: Platform) {
    console.log('Hello AjustesProvider Provider');
  }

  cargar_storage(){
    //para que espere, que el storage traiga la informacion
    let promesa = new Promise((resolve,reject)=>{

      if(this.platform.is("cordova")){
        //dispositivo
        console.log("Inicializando Storage");
        
        this.storage.ready().then(()=>{
          console.log("Storage Listo");
          
          this.storage.get("ajustes").then(ajustes=>{

            if(ajustes){
              this.ajustes=ajustes;
            }
            
            
            resolve();//para decir que termine
          })
        });
      }else{
        //primero hay que validar si existe la informacion
        if(localStorage.getItem("ajustes")){
          this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
        }
        //para que llame a la promesa, y diga que estamos listos para continuar
        resolve();
      }
    });

    return promesa;


    
  
  }

  guardar_storage(){
    if(this.platform.is("cordova")){
      //dispositivo
      this.storage.ready()
        .then(()=>{
          this.storage.set("ajustes", this.ajustes)
        });
    }else{
      //escritorio
      // el localstorage de escritorio, solo graba strings
      localStorage.setItem("ajustes",JSON.stringify(this.ajustes));
    }
  }

}
