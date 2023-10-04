import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-vaccination-home',
  templateUrl: './vaccination-home.component.html',
  styleUrls: ['./vaccination-home.component.scss']
})
export class VaccinationHomeComponent {

	constructor(private router: Router, private activatedRoute: ActivatedRoute){}
  
  change() {
	this.router.navigate(['vacinas/campanhas'])
        // this.router.navigate(
        //     [],
        //     {
        //         relativeTo: this.activatedRoute,
        //         queryParams: { 'tab': 'campanhas' },
        //     });
    }
}

