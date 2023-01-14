import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppEvent } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DatastateService {
  sourceEventSubject: Subject<AppEvent> = new Subject<AppEvent>();
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();
  
  publishEvent(event: AppEvent) {
    this.sourceEventSubject.next(event);
  }
}
