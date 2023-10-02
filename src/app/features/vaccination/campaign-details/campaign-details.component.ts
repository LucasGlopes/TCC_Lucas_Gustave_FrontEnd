import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
	campaignId: number | undefined;
	campaignForm!: FormGroup;
	subscriptions: Subscription[] = [];

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private datePipe: DatePipe,
		private vaccination: VaccinationService,
		private notification: NotificationService,
		private activatedRoute: ActivatedRoute
	){}

	ngOnInit(): void {
		this.initForm();
		this.checkRoute();
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
			id:[]
        }

        this.campaignForm = this.fb.group(form);
	}

	checkRoute(){
		const subscription = this.activatedRoute.params.subscribe(params => {
			this.campaignId = params['id']; 

			if(this.campaignId) this.loadCampaign();
		});

		this.subscriptions.push(subscription);
	}

	loadCampaign(){
		if(!this.campaignId) return; 

		this.vaccination.getCampaign(this.campaignId)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                this.goBack();
				return EMPTY;
            })
		)
		.subscribe((campaign) => {
			this.campaignForm.patchValue(campaign);
			this.formatDate();
		});
	}

	onSubmit(){
		if(this.campaignForm.invalid) return;

		const campaign: Campaign = this.campaignForm.value;
		campaign.dataCampanha = this.datePipe.transform(campaign.dataCampanha, 'dd/MM/yyyy')!;

		const subscription = (
			this.campaignId ? 
			this.vaccination.updateCampaign(campaign) :
			this.vaccination.createCampaign(campaign)
		)
		.pipe(
			catchError(() => {
                this.notification.openErrorSnackBar('Ocorreu um erro. Tente novamente mais tarde.');
                return EMPTY;
            })
		)
		.subscribe(() => {
			this.notification.openSuccessSnackBar('Campanha de vacinação salva com sucesso!');
			this.goBack();
		});

		this.subscriptions.push(subscription);
	}

	goBack(){
		this.router.navigate(['vacinas/campanhas'])
	}

	formatDate(){
		const dateComponents = this.campaignForm.controls['dataCampanha'].value.split("/");
		const dateObject = new Date(
			parseInt(dateComponents[2], 10),
			parseInt(dateComponents[1], 10) - 1,
			parseInt(dateComponents[0], 10)
		);
		this.campaignForm.controls['dataCampanha'].setValue(dateObject);
	}
}
