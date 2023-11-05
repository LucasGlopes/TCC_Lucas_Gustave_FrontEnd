import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { PointOptionsObject } from 'highcharts';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { QuantityByAptitude, QuantityBySector, QuantityBySex } from 'src/app/models/dashboard.model';
import { ChartService } from 'src/app/services/chart.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-dashboard-charts',
	templateUrl: './dashboard-charts.component.html',
	styleUrls: ['./dashboard-charts.component.scss']
})
export class DashboardChartsComponent implements OnInit, OnDestroy{
	sexChart!: Chart;
	sectorChart!: Chart;
	aptitudeChart!: Chart;

	subscriptions: Subscription[] = [];

	constructor(
		private dashboardService: DashboardService,
		private chartService: ChartService,
		private notification: NotificationService
	){}

	ngOnInit(): void {
		this.loadQuantityBySex();
		this.loadQuantityBySector();
		this.loadQuantityByAptitude();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	loadQuantityBySex(){
		const subscription = this.dashboardService.getQuantityBySex()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe(data => {
			this.setPieChartDataSex(data);
		});

		this.subscriptions.push(subscription);
	}

	setPieChartDataSex(data: QuantityBySex){
		const chartData: PointOptionsObject[] = [
			{
				name: 'Masculino',
				description: `${data.dados.homens}`,
				y: data.porcentagem.homens,
				color: '#4D648D'
			},
			{
				name: 'Feminino',
				description: `${data.dados.mulheres}`,
				y: data.porcentagem.mulheres,
				color: '#C28FD9'
			}
		]

		const chartTitle = 'Quantidade de funcionários por sexo';

		this.sexChart = this.chartService.setPieChart(chartTitle, chartData);
	}

	loadQuantityByAptitude(){
		const subscription = this.dashboardService.getQuantityByASO()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe(data => {
			this.setPieChartDataAptitude(data);
		});

		this.subscriptions.push(subscription);

	}

	setPieChartDataAptitude(data: QuantityByAptitude){
		const chartData: PointOptionsObject[] = [
			{
				name: 'Apto',
				description: `${data.dados.apto}`,
				y: data.porcentagem.apto,
				color: '#0d9e9b'
			},
			{
				name: 'Inapto',
				description: `${data.dados.inapto}`,
				y: data.porcentagem.inapto,
				color: '#D94A4A'
			}
		]

		const chartTitle = 'Quantidade de funcionários por aptidão';

		this.aptitudeChart = this.chartService.setPieChart(chartTitle, chartData);
	}

	loadQuantityBySector(){
		const subscription = this.dashboardService.getQuantityBySector()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe(data => {
			this.setPieChartDataSector(data);
		});

		this.subscriptions.push(subscription);

	}

	setPieChartDataSector(data: QuantityBySector[]){
		const chartData: PointOptionsObject[] = data.map(item => {
			return {
				name: item.setor,
				description: `${item.quantidade}`,
				y: item.porcentagem
			}
		})

		const chartTitle = 'Quantidade de funcionários por setor';

		this.sectorChart = this.chartService.setPieChart(chartTitle, chartData);
	}

}
