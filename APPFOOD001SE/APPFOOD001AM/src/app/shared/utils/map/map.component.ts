import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GoogleMap, Marker, Polyline, Polygon  } from '@capacitor/google-maps'
import { LatLng } from '@ionic-native/google-maps';
import { GmapService } from 'src/app/services/common/gmapservice.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'map-cs',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map', {static: true}) mapElementRef: HTMLElement;
  mapRef: HTMLElement;

  googleMaps: any;
  newMap: GoogleMap;
  @ViewChild('mapOG') mapElement: ElementRef;
  marker: Marker;
  @Input() displayActualUbication : boolean = false;
  @Input() Longitude : number;
  @Input() Lattitude : number;
  @Input() Height = '400px'
  @Input() Width = '100%'
  @Input() showDuration : false;
  @Input() showRoute : false;
  @Input() Zoom : number = 8;
  @Input() Draggable : boolean = true;

  isOGMap : boolean = true;

  duration : number; 
  private myUbication = {
    lat : 0, lng : 0
  }
  source: any = { lat: 0, lng: 0 };
  dest: any = {lat : 0, lng : 0} ;
  directionsService: any;
  directionsDisplay: any;
  key = environment.GoogleKey

  constructor(
    private maps: GmapService,
    private renderer: Renderer2,
    private geolocation: Geolocation,
  ) {
    
   }

  ngOnInit() {}

  async ngAfterViewInit() {
    this.createMap();
    
  }
  async showRouteTo(){
    this.isOGMap = !this.isOGMap;
    if(!this.isOGMap){
      await this.getMyUbication();
      this.dest = { lat: this.Lattitude, lng: this.Longitude };
      if(this.displayActualUbication){
        
        this.source = this.myUbication;
      }
      await this.loadMap();
    }else{
      // await this.createMap();
    }
   
  }
  async createMap() {
    this.mapRef = await document.getElementById('mapOG');
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef,
      apiKey: this.key,
      
      config: {
        center: {
          lat: this.Lattitude,
          lng: this.Longitude,
        },
        zoom: this.Zoom,
        draggable : this.Draggable,
        
      },
      
    });
    await this.newMap.setCamera({
      coordinate: {
        lat: this.Lattitude,
        lng: this.Longitude
      }
    });
    
    const markerId = await this.newMap.addMarker({
      
      coordinate: {
        lat: this.Lattitude,
        lng: this.Longitude
      },
      //title: 'Hola',
    });
  
  }
  async loadMap() {
    try {
      //console.log('map');
      this.mapElementRef = await document.getElementById("map");
      let googleMaps: any = await this.maps.loadGoogleMaps();

      const mapEl = this.mapElementRef;
      const map = await new googleMaps.Map(mapEl, {
        center: { lat: this.source.lat, lng: this.source.lng },
        disableDefaultUI: true,
        zoom: 10,
      });
      this.directionsService = new googleMaps.DirectionsService;
      this.directionsDisplay = new googleMaps.DirectionsRenderer;
      this.directionsDisplay = new googleMaps.DirectionsRenderer();

      const sourceIconUrl = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';
      const destinationIconUrl = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
      
      const source_position = new googleMaps.LatLng(this.source.lat, this.source.lng);
      const destination_position = new googleMaps.LatLng(this.dest.lat, this.dest.lng);

     
      const source_marker = await new googleMaps.Marker({
        map: map,
        position: source_position,
        animation: googleMaps.Animation.DROP,
      });

      const destination_marker = await new googleMaps.Marker({
        map: map,
        position: destination_position,
        animation: googleMaps.Animation.DROP,
      });

      await source_marker.setMap(map);
      await destination_marker.setMap(map);

      this.directionsDisplay.setMap(map);
      await this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 6,
          strokeOpacity: 1,
          strokeColor: 'orange'
        },
        suppressMarkers: true
      });

      await this.drawPolyline();

      map.setCenter(source_position);
      this.renderer.addClass(mapEl, 'visible');
    } catch(e) {
      console.log(e);
    }
  }

  async drawPolyline() {
    this.directionsService.route({
      origin: this.source,
      destination: this.dest,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
       // console.log('response: ', response);
        const directionsData = response.routes[0].legs[0];
        const duration = directionsData.duration.text;
        //console.log(duration);
        this.duration = duration
      } else {
        console.log(status);
      }
    });
  }
  async getMyUbication() {
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.myUbication = {lat : resp.coords.latitude, lng : resp.coords.longitude}
        //console.log('Ubicación actual:', resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.error('Error al obtener la ubicación', error);
    });
    
  }
}
