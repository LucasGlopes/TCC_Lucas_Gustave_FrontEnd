import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { CurrentUserService } from 'src/app/services/currentUser.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CalendarDateFormatter, CalendarEvent, CalendarView } from 'angular-calendar';
import {
	isSameMonth,
	isSameDay
} from 'date-fns';
import { colors } from '../../../../assets/colors';
import { VaccinationService } from 'src/app/services/vaccination.service';
import { Vaccination } from 'src/app/models/vaccination.model';
import { CustomDateFormatter } from '../../../services/custom-date-formatter.service';
  
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [
		{
		  	provide: CalendarDateFormatter,
		  	useClass: CustomDateFormatter,
		},
	],
})
export class HomeComponent implements OnInit{
	view: CalendarView = CalendarView.Month;

	locale: string = 'pt';

	viewDate: Date = new Date();

	events$!: Observable<CalendarEvent<{ vaccination: Vaccination }>[]>;

	activeDayIsOpen: boolean = false;

	constructor(
		private vaccination: VaccinationService,
		private currentUser: CurrentUserService,
		private notification: NotificationService
	) {}

	ngOnInit(): void {
		this.fetchEvents();
	}

	fetchEvents(): void {
		this.events$ = this.vaccination.getVaccinationsByUser(this.currentUser.getUserValues().id)
		.pipe(
			map((res) => {
				const events = res.map((vaccination: Vaccination) => {
					return {
						title: vaccination.campanha.nomeCampanha,
						start: new Date(
							this.formatDate(vaccination.campanha.dataCampanha) + this.getTimezoneOffsetString(this.viewDate)
						),
						color: colors.yellow,
						allDay: true,
						meta: {
							vaccination,
						},
					};
				});
				return events;
			}),
			catchError(() => {
				this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
				return EMPTY;
			})
		);

	}

	closeActiveDay(){
		this.activeDayIsOpen = false;
	}

	dayClicked({
		date,
		events,
	}: {
		date: Date;
		events: CalendarEvent<{ vaccination: Vaccination }>[];
	}): void {
		if (isSameMonth(date, this.viewDate)) {
			if (
				(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
				events.length === 0
			) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = true;
				this.viewDate = date;
			}
		}
	}

	eventClicked(event: CalendarEvent<{ vaccination: Vaccination }>): void {
		console.log(event)
	}

	formatDate(dateString: string){
		const dateComponents = dateString.split("/");
		const dateObject = new Date(
			parseInt(dateComponents[2], 10),
			parseInt(dateComponents[1], 10) - 1,
			parseInt(dateComponents[0], 10)
		);
		return `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`;
	}

	getTimezoneOffsetString(date: Date): string {
		const timezoneOffset = date.getTimezoneOffset();
		const hoursOffset = String(
		  Math.floor(Math.abs(timezoneOffset / 60))
		).padStart(2, '0');
		const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
		const direction = timezoneOffset > 0 ? '-' : '+';
	  
		return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
	}
}

