import { CalendarService } from "calendar-service";
import { Calendar } from "calendar";
import { DetailView } from "detail-view";
import { ServiceCollection } from "service-collection";
import { InstantiationService } from "instantiation-service";

const serviceCollection = new ServiceCollection();

const calendarService = new CalendarService();
serviceCollection.addService(CalendarService.ID, calendarService);

const instantiationService = new InstantiationService(serviceCollection);

const calendar = instantiationService.createInstance<Calendar>(Calendar, 30);
const detailView = instantiationService.createInstance<DetailView>(DetailView);

calendar.render(document.body);
detailView.render(document.body);