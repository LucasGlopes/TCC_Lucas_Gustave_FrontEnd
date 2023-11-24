import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { Aso, AsoType } from 'src/app/models/aso.model';
import { Exam, ExamType } from 'src/app/models/exam.model';
import { SelectorOption } from 'src/app/models/selector.model';

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

	asoTypes: SelectorOption[] = [
		{
			label: 'Admissional',
			value: AsoType.admissional
		},
		{
			label: 'Demissional',
			value: AsoType.demissional
		},
		{
			label: 'Periódico',
			value: AsoType.periodico
		},
		{
			label: 'de Mudança de risco',
			value: AsoType.mudanca
		},
		{
			label: 'de Retorno ao trabalho',
			value: AsoType.retorno
		}
	]

	ngOnInit(): void {
		this.aso.exames.forEach(exam => {
			if(exam.tipoExame === ExamType.clinico){
				this.clinicalExam = exam;
			} else {
				this.complementaryExams.push(exam);
			}
		});

		if(this.aso.risco.length === 0){
			this.aso.risco.push('Não existe exposição a agentes nocivos');
		}
	}

	ngAfterViewInit(): void {
		this.emitter.emit();
	}

	getType(type: AsoType){
		return this.asoTypes.find(asoType => asoType.value === type)?.label;
	}

}
