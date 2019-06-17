import { Event, Emitter } from "base/common/event";
import { Calendar } from "calendar";

export function ICalendarService(ctor: any, methodName: string, paramIndex: number): any {
  if (ctor['DEPENDENCIES']) ctor['DEPENDENCIES'].push(CalendarService.ID);
  else ctor['DEPENDENCIES'] = [CalendarService.ID];
}

export interface ICalendarService {

  readonly onDidSelectDate: Event<number>;

  addCalendar(calendar: Calendar): void;

}

export class CalendarService implements ICalendarService {

  static readonly ID = 'CalendarService';
  
  private readonly onDidSelectDate_: Emitter<number> = new Emitter();
  public readonly onDidSelectDate: Event<number> = this.onDidSelectDate_.event;

  addCalendar(calendar: Calendar): void {
    calendar.onDateClick(date => this.onDidSelectDate_.fire(date));
  }

}