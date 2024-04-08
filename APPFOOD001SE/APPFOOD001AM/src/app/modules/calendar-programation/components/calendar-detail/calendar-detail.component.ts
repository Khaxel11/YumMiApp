import { Component, OnInit, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProgramacionFechas } from 'src/app/models/Programation';
import { SheetModalComponent } from 'src/app/shared/components/sheet-modal/sheet-modal.component';
@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent implements OnInit {
  @ViewChild('templateReminder') public templateReminder: any;
  loading : any;
  programacion : ProgramacionFechas = new ProgramacionFechas();
  selectedSegment : number = 1;
  selectedAltSegment : number;
  reminderDate: string;
  reminderTime : number [] = [0,0,0];
  
  constructor(private modalController: ModalController, private alertController: AlertController,  private Load : LoadingController) { }

  ngOnInit(): void {
  }
  segmentChanged(event) {
    this.selectedAltSegment = this.selectedSegment;
    this.selectedSegment = Number(event.detail.value);
    // console.log('Segment changed', );
    // Aquí puedes realizar acciones adicionales si lo necesitas
  }
  closeModal(e? : any) {
   
    this.modalController.dismiss(e);
  }
  
  async buildMessage(Message : string){
    this.loading = await this.Load.create({
      message: Message, 
    });
  }
  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month < 10 ? "0"+month : month}-${day < 10 ? "0"+day : day}`;
  }
  async openMdlReminder() {
    await this.buildMessage("Cargando...");
    this.reminderDate = this.formatDate(this.programacion.fecha);
    await this.loading.present();
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer',
      swipeToClose: false,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateReminder
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {

      }else{
       
      }
    })
    await modal.present();
    await this.loading.dismiss();
  }
  6
  setReminder(){
    this.closeModal();
  }
  handleSelectedHourChange(selectedHour: number): void {
    this.reminderTime[0] = selectedHour;
    // Puedes realizar cualquier acción adicional aquí
  }

  // Método para manejar el cambio en selectedMin
  handleSelectedMinChange(selectedMin: number): void {
    this.reminderTime[1] = selectedMin;
    // Puedes realizar cualquier acción adicional aquí
  }
  handleSelectedTimeChange(selectedTime : any){
    this.reminderTime[2] = selectedTime === "a. m." ? 1 : 2;
  }
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return  base64String ? imageUrl : '../../../../../assets/Images/no-image-svgrepo-com.svg';
  }
  getDay(value) : string {
    const fecha = new Date(value);
    return fecha.getDate().toString();
  }
  getMonthName(value): string {
    const fecha = new Date(value);
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[fecha.getMonth()];
  }
}
