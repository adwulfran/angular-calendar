import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit
  
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from '/root/mattlewis/angular-calendar/demos/demo-modules/i18n/custom-date-formatter.provider';
import { Subject } from 'rxjs';
import { DayViewHour } from 'calendar-utils';
//import sharing data 
import { SharingDataService } from "/root/mattlewis/angular-calendar/demos/sharingdata.service";

const RED_CELL: 'red-cell' = 'red-cell';
const BLUE_CELL: 'blue-cell' = 'blue-cell';
const WHITE_CELL: 'white-cell' = 'white-cell';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
  // don't do this in your app, its only so the styles get applied globally
  styles: [
    `
    .cal-day-selected,
    .cal-day-selected:hover {
      background-color: deeppink !important;
    }
    .red-cell {
      background-color: red !important;
    }
    .blue-cell {
      background-color: blue !important;
    }
  `
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
  
})
export class DemoComponent implements OnInit {
  view : string = 'month';

  viewDate: Date = new Date();

  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDayViewDate: Date;

  dayView: DayViewHour[];

  events: CalendarEvent[] = [];

  // ajout 
   locale: string = 'fr';
   
   weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  refresh: Subject<any> = new Subject();

  cssClass: string = WHITE_CELL;

  needtok: number ;

  clickedDate: Date;

  arraydates : any[] = [];

  arrraydatesaved : any[] = [];

  zazou : number = 0;

  // ajout service
  messages:  any[];

  // ajout constructor pour service message !
   constructor(private sharingdata: SharingDataService) { }

   // ajout ngOinit pour service message !
   ngOnInit() {
    this.sharingdata.currentMessage.subscribe(messages => this.messages = messages)
  }

  arraydatef(param: Date) : void { 
    this.arraydates.push(param);
    console.log(this.arraydates);
  }

  newMessage() {
    this.sharingdata.changeMessage(this.arraydates);
  }

  refreshView(nouveautok: number): void {
   // this.cssClass = this.cssClass === RED_CELL ? BLUE_CELL : RED_CELL;
   //	this.cssClass = BLUE_CELL;
   	this.cssClass ='cal-day-selected';
    this.needtok = nouveautok;
    this.arraydates = [];
    this.zazou = 1;
   this.refresh.next();
    this.fcttimeout();
    console.log("needtok alors ?: "+ nouveautok);
  }

  fcttimeout() { 
  	setTimeout(() => {
       this.zazou = 0;
		}, 3000); 
  }

  refreshAll(): void {
    this.cssClass = WHITE_CELL;
    delete this.selectedMonthViewDay.cssClass;

    for (let i in this.arraydates) {
        delete this.arraydates[i]; // "0", "1", "2",
    }
    this.arraydates = ['', '' ,'', '' , '', '', '', '', '', '', '', '', '', '', ''];
    this.newMessage();
    this.arrraydatesaved = [];

    this.refresh.next();
  }

  dayClicked(day: CalendarMonthViewDay): void {
   /* if (this.selectedMonthViewDay) {
      delete this.selectedMonthViewDay.cssClass;
    }
    */
    day.cssClass = 'cal-day-selected';
    this.selectedMonthViewDay = day;
    this.arrraydatesaved.push(day.date.getTime());
  }


   /*orv( needtok : number)*/
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {

    body.forEach(day => {

      if (this.zazou === 1 && this.arrraydatesaved.indexOf(day.date.getTime()) !== -1 || day.date.getDay() === this.needtok  && this.arraydates.length < 15   ) {
        day.cssClass = this.cssClass;
        this.selectedMonthViewDay = day;
        this.arraydates.push(day.date); // se déclenche quand changeement de mois ou d'année ! problématique ... il peut se déclencehr quadn zazou = 1 mais mache pas
      }

    this.newMessage();
    

    });

    
  }

   
  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeDayViewRender(dayView: DayViewHour[]) {
    this.dayView = dayView;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.dayView.forEach(hourSegment => {
      hourSegment.segments.forEach(segment => {
        delete segment.cssClass;
        if (
          this.selectedDayViewDate &&
          segment.date.getTime() === this.selectedDayViewDate.getTime()
        ) {
          segment.cssClass = 'cal-day-selected';
        }
      });
    });
  }
}
