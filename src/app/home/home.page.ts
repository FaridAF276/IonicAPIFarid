import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PositionService } from '../service/position.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private geolocation: Geolocation, private posApi:PositionService){}
  locTab:String[]= [];
  data:string = '';

  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {

      // resp.coords.latitude
      // resp.coords.longitude
      let lattitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      let locText = '\n Lat : '+ lattitude + ' Long : '+longitude;
      // console.log(locText);
      this.locTab.push(locText); 
      console.log(this.locTab);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    // this.Time;
  }
  watch(){
    const watch = this.geolocation.watchPosition({enableHighAccuracy : true, timeout : 1000}).subscribe(position =>{
      if(position.coords !== undefined){
        let locationString = position.coords.longitude + '\t'+ position.coords.latitude;
        this.locTab.push(locationString);
        console.log(locationString);
        this.positionSend(position.coords.latitude, position.coords.longitude);
      }else{
        console.log(position); //Afficher l'erreur
        throw "Impossible de récupérer la position.";  
      }
    });
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });
  }
  positionSend(lat, long){
    this.posApi.sendPosition(lat, long).subscribe((response)=>{
      console.log(response);
    });
  }
  onSuccess(position){
    let lattitude=position.coords.lattiude;
    let longitude= position.coords.longitude;
    let locText = '\n Lat : '+ lattitude + ' Long : '+longitude;
    this.locTab.push(locText);
    console.log(this.locTab);
  }
  onError(err){
    console.log(err.code +'\t' +err.message);
  }
}

