import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
  
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs';
import { DayViewHour } from 'calendar-utils';

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
  ]
  
})
export class DemoComponent {
  view : string = 'month';

  viewDate: Date = new Date();

  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDayViewDate: Date;

  dayView: DayViewHour[];

  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  cssClass: string = WHITE_CELL;

  needtok: number = 0;

  clickedDate: Date;
  

  refreshView(nouveautok: number): void {
   // this.cssClass = this.cssClass === RED_CELL ? BLUE_CELL : RED_CELL;
   this.cssClass = BLUE_CELL;
    this.needtok = nouveautok;
    this.refresh.next();
    
    console.log("needtok alors ?: "+ nouveautok);
  }

  refreshAll(): void {
    this.cssClass = WHITE_CELL;
    delete this.selectedMonthViewDay.cssClass;
    this.refresh.next();
  }

  dayClicked(day: CalendarMonthViewDay): void {
   /* if (this.selectedMonthViewDay) {
      delete this.selectedMonthViewDay.cssClass;
    }
    */
    day.cssClass = 'cal-day-selected';
    this.selectedMonthViewDay = day;
  }


   /*orv( needtok : number)*/
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDay() === this.needtok ) {
        day.cssClass = this.cssClass;
      }
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
