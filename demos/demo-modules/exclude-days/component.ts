import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { subDays, addDays } from 'date-fns';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html'
})
export class DemoComponent {
  view: string = 'month';

  viewDate: Date = new Date('2016-01-05');

  events: CalendarEvent[] = [
    {
      start: new Date('2016-01-08'),
      end: new Date('2016-01-10'),
      title: 'One day excluded event',
      color: colors.red
    },
    {
      start: new Date('2016-01-01'),
      end: new Date('2016-01-09'),
      title: 'Multiple weeks event'
    }
  ];

  // exclude weekends
  excludeDays: number[] = [0, 6];

  skipWeekends(direction: 'back' | 'forward'): void {
    if (this.view === 'day') {
      if (direction === 'back') {
        while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
          this.viewDate = subDays(this.viewDate, 1);
        }
      } else if (direction === 'forward') {
        while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
          this.viewDate = addDays(this.viewDate, 1);
        }
      }
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDay() === 1 && day.inMonth) {
        day.cssClass = 'odd-cell';
      }
    });
  }
}
