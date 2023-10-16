import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-inicio-login',
  templateUrl: './inicio-login.component.html',
  styleUrls: ['./inicio-login.component.css']
})
export class InicioLoginComponent {
  position: any;
  estacionamiento: any;
  ngOnInit(){
    const hashCookie=this.cookieService.get('session_id');
    if(hashCookie!='978bd5877610d24d6f17d259522429c55710f33c6629aea9c95cae39a82ed740541872907ba03d439269dec7d3b1b0ebcfef5831ea0f3f8acbb1daff1577de8d'){
      if(hashCookie!='e4b7b5b1162da37abeff1df9ad7590fdf2197ac7a00acfec38d78c666a4df1f60663675ee40df49dff7ae5f93993d72b75a4de998e6f0af063d6348a2c97a74c'){
        this.router.navigate(['/principal'])
      }
    }
    navigator.geolocation.getCurrentPosition((position) =>{
      this.position = {lat: position.coords.latitude,lng: position.coords.longitude}
    });
    this.estacionamiento = {lat: 21.167028719268597,lng: -100.93247122125659} 
  }
  title = 'Estacionamiento Entrada';
   

  constructor(private cookieService: CookieService, private router:Router){}
}
