import { Component, OnInit } from '@angular/core';
import {icon, Map, marker, tileLayer} from 'leaflet';
import { PlacesService } from 'src/app/services/places.service';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  geo: any;
  map: any;

  constructor(private placeSvc: PlacesService) {}
    ngOnInit(){
      setTimeout(() => {
        this.geo = this.placeSvc.useLocation;
      },2000);
   }

   ngAfterViewInit(){
    setTimeout(() => {
      this.map = new Map('map').setView(this.geo, 13);

      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    },2000);
   }

   ubicar(){
    setTimeout(() => {
      marker(this.geo).addTo(this.map).bindPopup("<strong>Esta es tu ubicación</strong>").openPopup();
    }, 2000);
   }
   
   recargar(){
    location.reload();
   }

}
