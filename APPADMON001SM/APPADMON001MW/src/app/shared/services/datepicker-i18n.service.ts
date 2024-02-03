import { Injectable, Inject, Optional } from '@angular/core';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  es: {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  },
  fr: {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  }
};

interface I18n {
  language: string;
}

@Injectable()
export class DatepickerI18n extends NgbDatepickerI18n {
  constructor(@Inject('i18n') @Optional() private i18n: I18n) {
    super();
    this.i18n = this.i18n || {language: 'es'};
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this.i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
