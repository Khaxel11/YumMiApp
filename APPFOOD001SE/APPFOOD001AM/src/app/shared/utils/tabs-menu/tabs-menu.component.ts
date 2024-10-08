import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.css']
})
export class TabsMenuComponent implements AfterViewInit {
 tabs = [];
 activeTabIndex = 0;
  constructor(private navcontrol : NavController) { }

  ngAfterViewInit(): void {
    this.tabs = [
      {
        icon : 'receipt-outline',
        tab : 'Pedidos',
        route: 'delivery'
       },
       {
        icon : 'calendar-outline',
        tab : 'Programacion',
        route: 'calendar'
       },
       {
        icon : 'fast-food-outline',
        tab : 'Productos',
        route: 'products/catalog'
       },
       {
        icon : 'storefront-outline',
        tab : 'FoodHubs',
        route: '/home/foodhubs'
       },
      //  {
      //   icon : 'trophy-outline',
      //   tab : 'Recompensas',
      //   route: ''
      //  },
       {
        icon : 'person-circle-outline',
        tab : 'Perfil',
        route: 'profile'
       }
    ]
  }
  goToRoute(e :any){
    this.navcontrol.navigateForward(e.route);
  }
}
