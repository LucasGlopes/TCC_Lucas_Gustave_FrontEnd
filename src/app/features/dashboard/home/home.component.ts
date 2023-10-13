import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, map, switchMap } from 'rxjs';
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
import { ExamService } from 'src/app/services/exam.service';
import { Exam } from 'src/app/models/exam.model';
  
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
	events$!: Observable<CalendarEvent<{ vaccination: Vaccination } | { exam: Exam}>[]>;
	activeDayIsOpen: boolean = false;
	userId!: number;

	constructor(
		private vaccination: VaccinationService,
		private currentUser: CurrentUserService,
		private notification: NotificationService,
		private exam: ExamService
	) {}

	ngOnInit(): void {
		this.userId = this.currentUser.getUserValues().id;
		this.fetchEvents();
	}

	fetchEvents(): void {
		let events: CalendarEvent<{ vaccination: Vaccination } | { exam: Exam}>[] = [];

		this.events$ = this.vaccination.getVaccinationsByUser(this.userId)
		.pipe(
			switchMap((vaccinations) => {
				const vaccinationEvents = vaccinations.map((vaccination: Vaccination) => {
					return {
						title: `${vaccination.campanha.nomeCampanha} - ${vaccination.campanha.nomeVacina}`,
						start: this.formatDate(vaccination.campanha.dataCampanha),
						color: colors.yellow,
						allDay: true,
						meta: {
							vaccination,
						},
					};
				});
				events = events.concat(vaccinationEvents);

				return this.exam.getExamsByUser(this.userId);
			}),
			map((exams) => {
				const examEvents = exams.map((exam: Exam) => {
					return {
						title: exam.nomeExame,
						start: this.formatDateHour(exam.dataExame, exam.horaExame),
						color: colors.red,
						meta: {
							exam,
						},
					};
				});

				return events.concat(examEvents);
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
		return dateObject;
	}

	formatDateHour(dateString: string, hourString: string){
		const dateObject: Date = this.formatDate(dateString);
		const hourComponents = hourString.split(":");

		dateObject.setHours(parseInt(hourComponents[0]));
		dateObject.setMinutes(parseInt(hourComponents[1]));

		return dateObject;
	}

}

