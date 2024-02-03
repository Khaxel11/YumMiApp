import { NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class DateManager {
    private pad = (n: number) => n < 10 ? '0' + n : n;

    isDateObject(date: any): boolean {
        return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
    }

    UTCDateToString(value: Date): string | null {
        if (this.isDateObject(value)) {
            return value.getUTCFullYear() + '-'
                + this.pad(value.getUTCMonth() + 1) + '-'
                + this.pad(value.getUTCDate()) + 'T'
                + this.pad(value.getUTCHours()) + ':'
                + this.pad(value.getUTCMinutes()) + ':'
                + this.pad(value.getUTCSeconds());
        } else {
            return null;
        }
    }

    dateToString(value: Date): string | null {
        if (this.isDateObject(value)) {
            return value.getFullYear() + '-'
                + this.pad(value.getMonth() + 1) + '-'
                + this.pad(value.getDate()) + 'T'
                + this.pad(value.getHours()) + ':'
                + this.pad(value.getMinutes()) + ':'
                + this.pad(value.getSeconds());
        } else {
            return null;
        }
    }

    ngbDateToDate(value: NgbDate): Date {
        if (value !== null) {
            const day = value.day;
            const month = value.month - 1;
            const year = value.year;

            return new Date(year, month, day);
        } else {
            return null;
        }
    }

    toDate(value: any): Date {
        if (this.isDateObject(value)) {
            return value;
        } else if (value !== null && typeof value === 'object') {
            const day = value.day || 0;
            const month = value.month ? value.month - 1 : 0;
            const year = value.year || 0;

            return new Date(year, month, day);
        } else {
            return null;
        }
    }

    toNgbDate(value: any): NgbDate {
        if (this.formatter === null) {
            return null;
        }
        if (this.isDateObject(value)) {
            return this.dateToNgbDate(value);
        } else if (typeof value === 'string') {
            return NgbDate.from(this.formatter.parse(value));
        } else if (typeof value === 'object' && value !== null) {
            return value;
        } else {
            return null;
        }
    }

    dateToNgbDate(value: Date): NgbDate {
        const day = value.getDate();
        const month = value.getMonth() + 1;
        const year = value.getFullYear();
        const ngbDateStruct = {
            day,
            month,
            year
        };

        return NgbDate.from(ngbDateStruct);
    }

    stringToDate(value: string): Date {
        const aux = this.formatter.parse(value);
        return new Date(aux.year, aux.month - 1, aux.day);
    }

    ngbDateToString(value: NgbDateStruct): string {
        if (value === null) {
            return null;
        } else {
            return value.year + '-'
                + this.pad(value.month) + '-'
                + this.pad(value.day);
        }
    }

    ngbDateClone(value: NgbDate): NgbDate {
        if (value !== null) {
            const day = value.day;
            const month = value.month;
            const year = value.year;

            const ngbDateStruct = {
                day,
                month,
                year
            };

            return NgbDate.from(ngbDateStruct);
        } else {
            return null;
        }
    }

    constructor(
        public formatter: NgbDateParserFormatter = null
    ) { }
}
