import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { Campaign } from 'src/app/models/vaccination.model';
import { NotificationService } from 'src/app/services/notification.service';
import { VaccinationService } from 'src/app/services/vaccination.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit, OnDestroy {
	campaignForm!: FormGroup;
	subscriptions: Subscription[] = [];

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private datePipe: DatePipe,
		private vaccination: VaccinationService,
		private notification: NotificationService
	){}

	ngOnInit(): void {
		this.initForm();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	initForm(){
		const form = {
            nomeCampanha:['', [Validators.required]],
            nomeVacina: ['', [Validators.required]],
            descricao:['', [Validators.required]],
            dataCampanha:['', [Validators.required]],
        }

        this.campaignForm = this.fb.group(form);
	}

	onSubmit(){
		if(this.campaignForm.invalid) return;

		const campaign: Campaign = this.campaignForm.value;
		campaign.dataCampanha = this.datePipe.transform(campaign.dataCampanha, 'dd/MM/yyyy')!;

		const subscription = this.vaccination.createCampaign(campaign)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                return EMPTY;
            })
		)
		.subscribe(() => {
			this.notification.openSuccessSnackBar('Campanha de vacinação cadastrada com sucesso!');
			this.goBack();
		});

		this.subscriptions.push(subscription);
	}

	goBack(){
		this.router.navigate(['vacinas/campanhas'])
	}
}
