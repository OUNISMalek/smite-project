import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppContext, AppEvent } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataStateService {
  sourceEventSubject: BehaviorSubject<AppEvent> = new BehaviorSubject<AppEvent>(
    { appContext: AppContext.NO_ACTION }
  );
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  publishEvent(event: AppEvent) {
    this.sourceEventSubject.next(event);
  }
}
