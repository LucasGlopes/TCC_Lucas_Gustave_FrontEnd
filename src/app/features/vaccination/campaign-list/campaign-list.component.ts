import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-campaign-list',
	templateUrl: './campaign-list.component.html',
	styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent {

	constructor(
		private router: Router
	){}

	newCampaign(){
		this.router.navigate(['vacinas/campanhas/nova'])
	}

}
