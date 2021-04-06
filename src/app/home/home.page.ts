import { Component } from '@angular/core';

import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  acceleration: [number, number, number] = [0,0,0];
  position: [number, number] = [0,0];

  constructor(public plt:Platform, private deviceMotion: DeviceMotion, private geo: Geolocation) {

    plt.ready().then( (readySrc) => {

      if(readySrc == "cordova"){
        
        // ============= Acceleration ==========================
        //get initial value
        this.deviceMotion.getCurrentAcceleration()
          .then((acc: DeviceMotionAccelerationData) => {
            console.log('--ACC xyz', acc.x, acc.y, acc.z);
          })
          .catch((err: any) => console.log('--ACC error', err));

        //for updating
        let accWatch = this.deviceMotion.watchAcceleration();
        accWatch.subscribe((acc: DeviceMotionAccelerationData) => {

          console.log('--ACC xyz', acc.x, acc.y, acc.z);
          this.acceleration = [acc.x, acc.y, acc.z];

        }, (err: any) => console.log('--ACC err', err));


        // ============= Position =================================
        //get initial value
        this.geo.getCurrentPosition({ timeout: 1000, enableHighAccuracy: true, maximumAge: 3600 })
          .then((res: Geoposition) => {

            console.log("--LOCATION LOG", res.coords.latitude.toString())
            this.position[0] = res.coords.latitude;
            this.position[1] = res.coords.longitude;


          })

        //for updating
        let positionWatch = this.geo.watchPosition({ timeout: 1000, enableHighAccuracy: true, maximumAge: 3600 });
        positionWatch.subscribe((data: Geoposition) => {

          this.position[0] = data.coords.latitude;
          this.position[1] = data.coords.longitude;
          console.log('--LOCATION LOG', data.coords.latitude, data.coords.longitude);

        });
      }
      else{
        console.log("this is a browser");


        // ============= Position =================================
        //get initial value
        this.geo.getCurrentPosition({ timeout: 1000, enableHighAccuracy: true, maximumAge: 3600 })
          .then((res: Geoposition) => {

            console.log("--LOCATION LOG", res.coords.latitude.toString())
            this.position[0] = res.coords.latitude;
            this.position[1] = res.coords.longitude;


          })

        //for updating
        let positionWatch = this.geo.watchPosition({ timeout: 1000, enableHighAccuracy: true, maximumAge: 3600 });
        positionWatch.subscribe((data: Geoposition) => {

          this.position[0] = data.coords.latitude;
          this.position[1] = data.coords.longitude;
          console.log('--LOCATION LOG', data.coords.latitude, data.coords.longitude);

        });



      }

      


    });


  }





}
