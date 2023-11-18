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
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '../../../components/event-dialog/event-dialog.component';
import { Info } from 'src/app/models/info.model';
  
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
	exams: Exam[] = [];
	vaccinations: Vaccination[] = [];
	nearestExam: Exam | undefined;
	nearestVaccination: Vaccination | undefined;

	constructor(
		private vaccinationService: VaccinationService,
		private currentUser: CurrentUserService,
		private notification: NotificationService,
		private examService: ExamService,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.userId = this.currentUser.getUserValues().id;
		this.fetchEvents();
	}

	fetchEvents(): void {
		let events: CalendarEvent<{ vaccination: Vaccination } | { exam: Exam}>[] = [];

		this.events$ = this.vaccinationService.getVaccinationsByUser(this.userId)
		.pipe(
			switchMap((vaccinations) => {
				this.vaccinations = vaccinations;
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

				return this.examService.getExamsByUser(this.userId);
			}),
			map((exams) => {
				this.exams = exams;
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

				this.getNearestEvents();

				return events.concat(examEvents);
			}),
			catchError(() => {
				this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
				return EMPTY;
			})
		);

	}

	getNearestEvents(){
		this.getNearestExam();
		this.getNearestVaccination();
	}

	getNearestExam(){
		const currentDate = new Date();

		this.exams.sort((e1, e2) => 
			this.compareDates(this.formatDateHour(e1.dataExame, e1.horaExame),this.formatDateHour(e2.dataExame, e2.horaExame))
		)
		const futureExams = this.exams.filter(exam => 
			this.formatDateHour(exam.dataExame, exam.horaExame) >= currentDate
		)
		this.nearestExam = futureExams[0];
	}

	getNearestVaccination(){
		const currentDate = new Date();

		this.vaccinations.sort((v1, v2) => 
			this.compareDates(this.formatDate(v1.campanha.dataCampanha),this.formatDate(v2.campanha.dataCampanha))
		)
		const futureVaccinations = this.vaccinations.filter(vaccination => 
			this.formatDate(vaccination.campanha.dataCampanha) >= currentDate
		)
		this.nearestVaccination = futureVaccinations[0];
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

	nearestExamClicked(){
		let infoObject: Info;
		infoObject = {
			title: this.nearestExam!.nomeExame,
			dateTimeTitle: 'Data/Hora',
			dateTimeContent: `${this.nearestExam!.dataExame} - ${this.nearestExam!.horaExame}`,
			bodyTitle: 'Local',
			bodyContent: this.nearestExam!.localExame
		}

		this.openDialog(infoObject);
	}


	nearestVaccinationClicked(){
		let infoObject: Info;
		infoObject = {
			title: this.nearestVaccination!.campanha.nomeCampanha,
			dateTimeTitle: 'Data',
			dateTimeContent: `${this.nearestVaccination!.campanha.dataCampanha}`,
			bodyTitle: 'Descrição',
			bodyContent: this.nearestVaccination!.campanha.descricao
		}

		this.openDialog(infoObject);
	}

	eventClicked(event: CalendarEvent): void {
		let infoObject: Info;
		if(event.meta?.exam) {
			infoObject = {
				title: event.meta?.exam.nomeExame,
				dateTimeTitle: 'Data/Hora',
				dateTimeContent: `${event.meta?.exam.dataExame} - ${event.meta?.exam.horaExame}`,
				bodyTitle: 'Local',
				bodyContent: event.meta?.exam.localExame
			}
		} else {
			infoObject = {
				title: `${event.meta?.vaccination.campanha.nomeCampanha} - ${event.meta?.vaccination.campanha.nomeVacina}`,
				dateTimeTitle: 'Data',
				dateTimeContent: `${event.meta?.vaccination.campanha.dataCampanha}`,
				bodyTitle: 'Descrição',
				bodyContent: event.meta?.vaccination.campanha.descricao
			}
		}
		this.openDialog(infoObject);
		
	}

	openDialog(infoObject: Info){
		this.dialog.open(EventDialogComponent, {
            autoFocus: false,
            data: infoObject,
			maxWidth: '600px'
		})
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


	compareDates(d1: Date, d2: Date){
		if (d1 > d2) {
			return 1;
		}
		if (d1 < d2) {
			return -1;
		}
		return 0;
	}

}

