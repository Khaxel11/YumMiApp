import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {merge, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, tap, switchMap, map, filter} from 'rxjs/operators';
import * as $ from 'jquery';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash-es';

interface DataParams {
  rows?: number|string;
  params: any;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  private modelValue: any;
  private auxModel: any;
  currentText: string;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  @Input() id: string;
  @Input() serviceFunction: (term: string, data?: DataParams) => Observable<any>;
  @Input() labelText: string;
  @Input() labelClass: string;
  @Input() textboxId = 'typeahead-http';
  @Input() textboxClass = 'form-control';
  @Input() placeholder = '';
  @Input() searchingText = 'buscando...';
  @Input() failedText = 'Se ha producido un error al buscar.';
  @Input() showSearching = false;
  @Input() showFailed = false;
  @Input() showValid = true;
  @Input() showInvalid = true;
  @Input() editableModel = false;
  @Input() rows = 10;
  @Input() params: any = {};
  @Input() title = '';
  @Input() formatter: (data: any) => string;
  @Input() propText: 'text';
  @Output() modelChange = new EventEmitter<any>();
  @Input() get model(): any {
    return this.modelValue;
  }
  set model(value: any) {
    this.modelValue = value;
    this.modelChange.emit(this.modelValue);
  }


  searching = false;
  searchFailed = false;
  selected = false;
  maxChildWidth = 0;

  dataParams: DataParams;

  search: (text$: Observable<string>) => Observable<any>;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    const selector = this.id ? 'auto-complete#' + this.id + ' > div.autocomplete-container > input[role="combobox"]' :
      'auto-complete > div.autocomplete-container > input[role="combobox"]';
    const ele = document.querySelector(selector);

    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target;
        const sibling = target.nextSibling;
        if (mutation.attributeName === 'class' && sibling.nodeName === 'NGB-TYPEAHEAD-WINDOW') {
          const siblingEle = $(sibling);
          siblingEle.scrollTop(0);
          siblingEle.scrollLeft(0);

          const parent = $(target);
          if (parent.hasClass('open')) {
            this.maxChildWidth = 0;
            siblingEle.children().children('ngb-highlight').toArray().forEach(element => {
              const eleWidth = $(element).outerWidth(true);
              if (eleWidth > this.maxChildWidth) {
                this.maxChildWidth = eleWidth;
              }
            });

            siblingEle.children('button').toArray().forEach(element => {
              const elem = $(element);
              const currentWidth = elem.outerWidth(true);
              const xtraWidth = (elem.outerWidth() - elem.innerWidth()) + // border width
                (elem.innerWidth() - elem.width()) + // padding width
                (elem.outerWidth(true) - elem.outerWidth()); // margin width
              const actualWidth = this.maxChildWidth + (xtraWidth / 2);
              if (actualWidth > currentWidth) {
                elem.outerWidth(actualWidth);
              }
            });
          }
        }
        if (mutation.attributeName === 'aria-activedescendant' && sibling.nodeName === 'NGB-TYPEAHEAD-WINDOW') {
          const activeEle = $(sibling).children('.active');
          const currentWidth = activeEle.outerWidth(true);
          const xtraWidth = (activeEle.outerWidth() - activeEle.innerWidth()) + // border width
            (activeEle.innerWidth() - activeEle.width()) + // padding width
            (activeEle.outerWidth(true) - activeEle.outerWidth()); // margin width
          const actualWidth = this.maxChildWidth + (xtraWidth / 2);

          if (actualWidth > currentWidth) {
            activeEle.outerWidth(actualWidth);
          }
        }
      });
    });
    observer.observe(ele, config);

    this.dataParams = {rows: this.rows, params: this.params};

    this.search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        tap(() => this.searching = true),
        switchMap(term =>
          this.serviceFunction ?
          this.serviceFunction(term, this.dataParams)
          .pipe(
            map(data => data.data ? data.data : data)
          )
          .pipe(
            tap(() => this.searchFailed = false),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })) : of([])
          ),
          tap(() => {
            this.searching = false;
            $(ele).toggleClass('change');
          })
      );
    };
  }

  modelChangeEmitter(value: any): void {
    this.setAuxModel(value);
    this.modelChange.emit(value);
  }

  setAuxModel(value: any): void {
    if (value) {
      this.auxModel = cloneDeep(value);
    }
  }

  focusOut(): void {
    if (!this.model && this.auxModel) {
      const value = $('#' + this.textboxId).val().toString();

      if (value === this.auxModel[this.propText]) {
        this.model = cloneDeep(this.auxModel);
      }
    }
  }
}
