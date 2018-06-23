import { Component, Input, Output, EventEmitter } from '@angular/core';
import addDays from 'date-fns/add_days/index';
import addWeeks from 'date-fns/add_weeks/index';
import addMonths from 'date-fns/add_months/index';



@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `

 

<div class="dropdown">
<button (click)="myFunction()" class="dropbtn">Dropdown</button><button (click)="myFunction2()" class="dropbtn">Dropdown</button>
  <div id="myDropdown" class="dropdown-content">
    <button (click)="mois(0);">Janvier</button>
    <button (click)="mois(1);">Fevrier</button>
    <button (click)="mois(2);">Mars</button>
    <button (click)="mois(3);">Avril</button>
    <button (click)="mois(4);">Mai</button>
    <button (click)="mois(5);">Juin</button>
    <button (click)="mois(6);">Juillet</button>
    <button (click)="mois(7);">Aout</button>
    <button (click)="mois(8);">Septembre</button>
    <button (click)="mois(9);">Octobre</button>
    <button (click)="mois(10);">Novembre</button>
    <button (click)="mois(11);">Decembre</button>
    <a href="#contact">Contact</a>
  </div>
  <div id="myDropdown2" class="dropdown-content">
    <button (click)="annee(2014);">2014</button>
    <button (click)="annee(2015);">2015</button>
    <button (click)="annee(2016);">2016</button>
    <button (click)="annee(2017);">2017</button>
    <button (click)="annee(2018);">2018</button>
    <button (click)="annee(2019);">2019</button>
    <button (click)="annee(2020);">2020</button>
    <button (click)="annee(2021);">2021</button>
    <button (click)="annee(2022);">2022</button>
    <button (click)="annee(2023);">2023</button>
    <button (click)="annee(2024);">2024</button>
    <button (click)="annee(2025);">2025</button>
    <a href="#contact">Contact</a>
  </div>
</div>










    <div class="row text-center">

   

      <div class="col-md-4">
        <div class="btn-group">
          <div
            class="btn btn-primary"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Mois Précédent
          </div>
          <div
            class="btn btn-outline-secondary"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Ce mois-ci
          </div>
          <div
            class="btn btn-primary"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Mois Suivant
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>
      </div>
      <div class="col-md-4">
        <div class="btn-group">
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('month')"
            [class.active]="view === 'month'">
            Month
          </div>
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('week')"
            [class.active]="view === 'week'">
            Week
          </div>
          <div
            class="btn btn-primary"
            (click)="viewChange.emit('day')"
            [class.active]="view === 'day'">
            Day
          </div>
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

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;} ` ]
})
export class CalendarHeaderComponent {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  data: number;

  datay : number;

 dattk : number;
  annee(datay): void { 

    this.dattk = datay;
    this.mois(0);
  }

  mois(data): void {
    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    //this.viewDateChange.emit(addFn(this.viewDate, data));
    if (!dattk) { let dattk = 2014}
    this.viewDateChange.emit(addFn(new Date(this.dattk, 1, 1), data-1));
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
   

}
