import { ICalendarService } from "calendar-service";

export class DetailView {

  private contentContainer_: HTMLDivElement;

  constructor(
    @ICalendarService calendarService: ICalendarService) {
    this.contentContainer_ = document.createElement('div');
    this.contentContainer_.className ='detail';
    calendarService.onDidSelectDate(this.didSelectDateHandler.bind(this));
  }

  private didSelectDateHandler(date: number) {
    this.showText(`You have clicked ${date}!`);
  }

  public showText(text: string) {
    const el = document.createElement('div');
    el.textContent = text;
    this.contentContainer_.innerHTML = '';
    this.contentContainer_.appendChild(el);
  }

  render(container: HTMLElement) {
    container.appendChild(this.contentContainer_);
  }

}