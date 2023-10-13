import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfis } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/currentUser.service';

@Component({
	selector: 'app-exams-scheduling',
	templateUrl: './exams-scheduling.component.html',
	styleUrls: ['./exams-scheduling.component.scss']
})
export class ExamsSchedulingComponent implements OnInit {
	hasPermission: boolean = false;

	constructor(
		private user: CurrentUserService,
		private router: Router
	){}

	ngOnInit(): void {
		this.checkPermission();
	}

	checkPermission(){
		const profiles = this.user.getUserValues().perfis;

		this.hasPermission = profiles.some(profile => 
			profile === Perfis.admin || profile === Perfis.tecnico
		);
	}

	newExam(){
		this.router.navigate(['exames/agendamentos/novo-exame']);
	}
}
