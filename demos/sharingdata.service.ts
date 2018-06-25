import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharingDataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
 	arraydates : any[] = [];
  constructor() { }

  changeMessage(messages: any[]) {
    this.messageSource.next(messages)
  }

}