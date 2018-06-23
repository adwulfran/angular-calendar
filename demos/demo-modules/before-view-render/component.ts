import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
  
})
export class DemoComponent {
  view: string = 'month';

  viewDate: Date = new Date();


  events: CalendarEvent[] = [];


  selectedMonthViewDay: CalendarMonthViewDay;


  events: CalendarEvent[] = [];

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDay() === 1 ) {
        day.cssClass = 'odd-cell';
      }
    });
  }
}
