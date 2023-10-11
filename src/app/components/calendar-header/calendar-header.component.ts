import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
	selector: 'calendar-header',
	templateUrl: './calendar-header.component.html',
	styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
	@Input() view!: CalendarView;

	@Input() viewDate!: Date;

	@Input() locale: string = 'pt';

	@Output() viewChange = new EventEmitter<CalendarView>();

	@Output() viewDateChange = new EventEmitter<Date>();

	CalendarView = CalendarView;

}