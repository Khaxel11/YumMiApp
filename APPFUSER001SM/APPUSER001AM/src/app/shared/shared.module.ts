import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FancyInputComponent } from './components/fancy-input/fancy-input.component';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from './components/slider/slider.component';
import { ModalComponent } from './components/modal/modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StarsComponent } from './utils/stars/stars.component';
import { StarsAverageComponent } from './utils/stars-average/stars-average.component';
import { CalendarComponent } from './utils/calendar/calendar.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { HorizontalListComponent } from './components/horizontal-list/horizontal-list.component';
import { TabsMenuComponent } from './utils/tabs-menu/tabs-menu.component';
import { DoubleTapDirective } from './directives/double-tap.directive';
import { FormsModule } from '@angular/forms';
import { DishViewComponent } from './utils/dish-view/dish-view.component';
import { CreditCardComponent } from './utils/credit-card/credit-card.component';
import { CardCsComponent } from './components/card-cs/card-cs.component';
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
    StarsComponent,
    StarsAverageComponent,
    AccordionComponent,
    HorizontalListComponent,  
    TabsMenuComponent,
    DoubleTapDirective,
    CalendarComponent,
    DishViewComponent,
    CreditCardComponent,
    CardCsComponent,
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
    StarsComponent,
    CardCsComponent,
    StarsAverageComponent,
    AccordionComponent,
    HorizontalListComponent,
    TabsMenuComponent,
    DoubleTapDirective,
    CalendarComponent,
    DishViewComponent,
    CreditCardComponent,
    ThumbsSkellyComponent,
    SheetModalComponent,
    DraggableComponent,
    CoolCalendarComponent,
    ReminderComponent
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
