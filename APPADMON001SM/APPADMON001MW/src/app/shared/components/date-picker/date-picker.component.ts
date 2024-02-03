import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateManager } from 'src/app/models/common/dateManager';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  innerModel: NgbDate = null;
  validatorModel: NgbDate = null;
  private dateManager: DateManager;
  today = this.calendar.getToday();
  dateValue: string = null;
  @Output() dateChange = new EventEmitter<string>();
  @Input() readonly = false;
  @Input() placeholder = 'dd/mm/aaaa';
  @Input() buttonId = '';
  @Input() containerClass = '';

  @Input() get date(): string {
    return this.dateValue;
  }
  set date(value: string) {
    this.dateValue = value;
    this.innerModel = this.dateManager.toNgbDate(value);
    this.validatorModel = this.innerModel;
  }

  get model(): NgbDate {
    return this.innerModel;
  }
  set model(value: NgbDate) {
    if (typeof value === 'object') {
      this.innerModel = value;
      this.validatorModel = value;
      this.dateValue = this.dateManager.ngbDateToString(value);
      this.dateChange.emit(this.dateValue);
    } else {
      this.validatorModel = value;
      // this.innerModel = null;
      // this.dateValue = null;
    }
  }

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.dateManager = new DateManager(formatter);
  }

  todayClick(): void {
    this.model = this.today;
  }
  foValidation(): void {
    if (this.innerModel === this.validatorModel) {
      return;
    }

    if (!this.validatorModel) {
      this.innerModel = null;
      this.validatorModel = null;
      this.dateValue = null;
      this.dateChange.emit(this.dateValue);
    } else {
      const vModel = this.dateManager.toNgbDate(this.validatorModel);

      if (this.calendar.isValid(vModel)) {
        this.innerModel = vModel;
        this.validatorModel = vModel;
        this.dateValue = this.dateManager.ngbDateToString(vModel);
        this.dateChange.emit(this.dateValue);
      } else {
        this.validatorModel = null;

        if (this.innerModel) {
          this.innerModel = null;
          this.dateValue = null;
          this.dateChange.emit(this.dateValue);
        }
      }
    }
  }
}
