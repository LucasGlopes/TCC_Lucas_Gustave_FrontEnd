import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { Aso } from 'src/app/models/aso.model';
import { Exam, ExamType } from 'src/app/models/exam.model';

@Component({
	selector: 'app-pdf-page',
	templateUrl: './pdf-page.component.html',
	styleUrls: ['./pdf-page.component.scss']
})
export class PdfPageComponent implements OnInit, AfterViewInit {
	aso!: Aso;
	clinicalExam!: Exam;
	complementaryExams: Exam[] = [];

	emitter: EventEmitter<void> = new EventEmitter();

	constructor(
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.aso.exames.forEach(exam => {
			if(exam.tipoExame === ExamType.clinico){
				this.clinicalExam = exam;
			} else {
				this.complementaryExams.push(exam);
			}
		});

		this.aso.validade = this.datePipe.transform(this.aso.validade, 'dd/MM/yyyy')!;

		if(this.aso.risco.length === 0){
			this.aso.risco.push('Não existe exposição a agentes nocivos');
		}
	}

	ngAfterViewInit(): void {
		this.emitter.emit();
	}

}
