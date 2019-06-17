import { ICalendarService, CalendarService } from "calendar-service";
import { Emitter, Event } from "base/common/event";

export class Calendar {

  private readonly onDateClick_: Emitter<number> = new Emitter();
  public readonly onDateClick: Event<number> = this.onDateClick_.event;
  
  private numberOfDate_: number;

  constructor(
    numberOfDate: number,
    @ICalendarService calendarService: ICalendarService) {
    this.numberOfDate_ = numberOfDate;
    calendarService.addCalendar(this);
  }

  private renderDate(date: number): HTMLElement {
    const div = document.createElement('div');
    div.className ='date';
    div.textContent = date.toString();
    div.addEventListener('click', () => this.onDateClick_.fire(date));
    return div;
  }

  public render(container: HTMLElement) {
    const div = document.createElement('div');
    div.className ='calendar';
    for (let i = 1; i <= this.numberOfDate_; i ++) {
      const dateEl = this.renderDate(i);
      div.appendChild(dateEl);
    }
    container.appendChild(div);
  }

}

console.log((Calendar as any)['DEPENDENCIES']);