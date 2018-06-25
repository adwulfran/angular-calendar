import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import addDays from 'date-fns/add_days/index';
import addWeeks from 'date-fns/add_weeks/index';
import addMonths from 'date-fns/add_months/index';

import { CustomDateFormatter } from '/root/mattlewis/angular-calendar/demos/demo-modules/i18n/custom-date-formatter.provider';
import {
  CalendarEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `




  <div class="row text-center">
  <div class="col-md-4">
  <div class="btn-group">



  </div>
  </div>
  <div class="col-md-4">

  <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>
  <div class="dropdown">
  <button (click)="myFunction()" class="dropbtn">Mois<i class="fa fa-caret-down"></i></button><button (click)="myFunction2()" class="dropbtn">Année<i class="fa fa-caret-down"></i></button>
  <div id="myDropdown" class="dropdown-content">
  <a (click)="mois(0);" style="padding: 12px 16px;">Janvier</a>
  <a (click)="mois(1);" style="padding: 12px 16px;">Fevrier</a>
  <a (click)="mois(2);" style="padding: 12px 16px;">Mars</a>
  <a (click)="mois(3);" style="padding: 12px 16px;">Avril</a>
  <a (click)="mois(4);" style="padding: 12px 16px;">Mai</a>
  <a (click)="mois(5);" style="padding: 12px 16px;">Juin</a>
  <a (click)="mois(6);" style="padding: 12px 16px;">Juillet</a>
  <a (click)="mois(7);" style="padding: 12px 16px;">Aout</a>
  <a (click)="mois(8);" style="padding: 12px 16px;">Septembre</a>
  <a (click)="mois(9);" style="padding: 12px 16px;">Octobre</a>
  <a (click)="mois(10);" style="padding: 12px 16px;">Novembre</a>
  <a (click)="mois(11);" style="padding: 12px 16px;">Decembre</a>
  
  </div>
  <div id="myDropdown2" class="dropdown-content">
  <a (click)="annee(2014);" style="padding: 12px 90px;" >2014</a>
  <a (click)="annee(2015);" style="padding: 12px 90px;">2015</a>
  <a (click)="annee(2016);" style="padding: 12px 90px;">2016</a>
  <a (click)="annee(2017);" style="padding: 12px 90px;">2017</a>
  <a (click)="annee(2018);" style="padding: 12px 90px;">2018</a>
  <a (click)="annee(2019);" style="padding: 12px 90px;">2019</a>
  <a (click)="annee(2020);" style="padding: 12px 90px;">2020</a>
  <a (click)="annee(2021);" style="padding: 12px 90px;">2021</a>
  <a (click)="annee(2022);" style="padding: 12px 90px;">2022</a>
  <a (click)="annee(2023);" style="padding: 12px 90px;">2023</a>
  <a (click)="annee(2024);" style="padding: 12px 90px;">2024</a>
  <a (click)="annee(2025);" style="padding: 12px 90px;">2025</a>
  
  </div>
  </div>
  </div>
  <div class="col-md-4">
  <div class="btn-group">



  </div>
  </div>
  </div>
  <br>
  `,

  styles : [` .dropbtn {
    background-color: #3498DB;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropbtn:hover, .dropbtn:focus {
    background-color: #2980B9;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown-content button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a {
    float: none;
    color: black;
    
    text-decoration: none;
    display: block;
    text-align: left;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }

  .dropdown button:hover {background-color: #ddd;}

  .show {display: block;} 

  .ajust {padding-right: 20px; }
  ` ],
   providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarHeaderComponent {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'fr';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  data: number = 5;

  datay : number;

  dattk : number;
  annee(datay): void { 

    this.dattk = datay;
    this.mois(this.data);
    let dropdowns = document.getElementById("myDropdown2");
    dropdowns.classList.remove('show');
  }

  mois(data): void {
    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.data = data; 
    //this.viewDateChange.emit(addFn(this.viewDate, data));
    if (!this.dattk) {  this.dattk = 2018}
      this.viewDateChange.emit(addFn(new Date(this.dattk, 1, 1), data-1));

    let dropdowns = document.getElementById("myDropdown");
    dropdowns.classList.remove('show');
  }


    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    }

    myFunction2() {
      document.getElementById("myDropdown2").classList.toggle("show");
    }
    // A FAIRE?Close the dropdown if the user clicks outside of it

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdowns = document.getElementById("myDropdown");
    const dropdowns2 = document.getElementById("myDropdown2");
    if ( !event.target.matches('.dropbtn')) { 
    dropdowns.classList.remove('show');
    dropdowns2.classList.remove('show');
  }
  }


  }
