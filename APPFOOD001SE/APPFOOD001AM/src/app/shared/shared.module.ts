import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FancyInputComponent } from './components/fancy-input/fancy-input.component';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from './components/slider/slider.component';
import { ModalComponent } from './components/modal/modal.component';
import { MenuStartComponent } from './utils/menu-start/menu-start.component';
import { MainSliderComponent } from './utils/main-slider/main-slider.component';
import { MapComponent } from './utils/map/map.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StarsComponent } from './utils/stars/stars.component';
import { StarsAverageComponent } from './utils/stars-average/stars-average.component';
import { FilteredCategoriesComponent } from './utils/filtered-categories/filtered-categories.component';
import { MdlFilterComponent } from './utils/filtered-categories/mdl-filter/mdl-filter.component';
import { CalendarComponent } from './utils/calendar/calendar.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { HorizontalListComponent } from './components/horizontal-list/horizontal-list.component';
import { EventsVisualizationComponent } from './utils/events-visualization/events-visualization.component';
import { ActiveOrderComponent } from './utils/active-order/active-order.component';
import { TabsMenuComponent } from './utils/tabs-menu/tabs-menu.component';
import { DoubleTapDirective } from './directives/double-tap.directive';
import { ProgramationProductsComponent } from './utils/programation-products/programation-products.component';
import { ModalPersonalizedDateSelectorComponent } from './utils/modal-personalized-date-selector/modal-personalized-date-selector.component';
import { FormsModule } from '@angular/forms';
import { DishViewComponent } from './utils/dish-view/dish-view.component';
import { CreditCardComponent } from './utils/credit-card/credit-card.component';
import { CardCsComponent } from './components/card-cs/card-cs.component';
import { SelectFoodHubComponent } from './utils/select-food-hub/select-food-hub.component';
import { ThumbsSkellyComponent } from './components/thumbs-skelly/thumbs-skelly.component';
import { DraggableComponent } from './components/draggable/draggable.component';
import { SheetModalComponent } from './components/sheet-modal/sheet-modal.component';
import { CoolCalendarComponent } from './components/cool-calendar/cool-calendar.component';
import { ReminderComponent } from './components/reminder/reminder.component';
@NgModule({
  declarations: [    
    
    FancyInputComponent,
    SliderComponent,
    ModalComponent,
    MenuStartComponent,
    MainSliderComponent,
    MapComponent,
    StarsComponent,
    StarsAverageComponent,
    FilteredCategoriesComponent,
    MdlFilterComponent,
    AccordionComponent,
    HorizontalListComponent,
    EventsVisualizationComponent,
    ActiveOrderComponent,
    TabsMenuComponent,
    DoubleTapDirective,
    ProgramationProductsComponent,
    CalendarComponent,
    ModalPersonalizedDateSelectorComponent,
    DishViewComponent,
    CreditCardComponent,
    CardCsComponent,
    SelectFoodHubComponent,
    ThumbsSkellyComponent,
    DraggableComponent,
    SheetModalComponent,
    CoolCalendarComponent,
    ReminderComponent
  ],
  imports: [ 
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  exports : [
    FancyInputComponent,
    SliderComponent,
    ModalComponent,
    MenuStartComponent,
    MainSliderComponent,
    MapComponent,
    StarsComponent,
    CardCsComponent,
    StarsAverageComponent,
    FilteredCategoriesComponent,
    AccordionComponent,
    HorizontalListComponent,
    EventsVisualizationComponent,
    ActiveOrderComponent,
    TabsMenuComponent,
    DoubleTapDirective,
    ProgramationProductsComponent,
    CalendarComponent,
    ModalPersonalizedDateSelectorComponent,
    DishViewComponent,
    CreditCardComponent,
    SelectFoodHubComponent,
    ThumbsSkellyComponent,
    SheetModalComponent,
    DraggableComponent,
    CoolCalendarComponent,
    ReminderComponent
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
