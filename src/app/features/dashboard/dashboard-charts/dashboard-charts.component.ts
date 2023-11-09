import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { PointOptionsObject, SeriesOptionsType } from 'highcharts';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { CampaignStatusQuantity, ExamByMonth, QuantityByAptitude, QuantityByCampaign, QuantityBySector, QuantityBySex } from 'src/app/models/dashboard.model';
import { ExamType } from 'src/app/models/exam.model';
import { Campaign, Status } from 'src/app/models/vaccination.model';
import { ChartService } from 'src/app/services/chart.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NotificationService } from 'src/app/services/notification.service';
import { VaccinationService } from 'src/app/services/vaccination.service';
import { months } from 'src/assets/months';

@Component({
	selector: 'app-dashboard-charts',
	templateUrl: './dashboard-charts.component.html',
	styleUrls: ['./dashboard-charts.component.scss']
})
export class DashboardChartsComponent implements OnInit, OnDestroy{
	sexChart!: Chart;
	sectorChart!: Chart;
	aptitudeChart!: Chart;
	campaignsColumnChart!: Chart;
	examsChart!: Chart;
	campaignsPieChart!: Chart;
	campaigns: Campaign[] = [];
	currentCampaign = new FormControl();
	subscriptions: Subscription[] = [];

	constructor(
		private dashboardService: DashboardService,
		private chartService: ChartService,
		private notification: NotificationService,
		private vaccination: VaccinationService
	){}

	ngOnInit(): void {
		this.loadQuantityBySex();
		this.loadQuantityBySector();
		this.loadQuantityByAptitude();
		this.loadQuantityOfVaccinationsByCampaign();
		this.loadExamsByMonth();
		this.loadCampaigns();
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

	loadQuantityOfVaccinationsByCampaign(){
		const subscription = this.dashboardService.getQuantityOfVaccinationsByCampaign()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe(data => {
			this.setColumnChartDataCampaign(data)
		});

		this.subscriptions.push(subscription);
	}

	setColumnChartDataCampaign(data: QuantityByCampaign[]){
		const chartCategories: string[] = data.map(item => item.campanha);

		const chartData: SeriesOptionsType[] = [];

		chartData.push(
			{
				name: 'Vacinações concluídas',
				data: data.map(item => item.quantidadeVacinados),
				color: '#4D648D'
			} as SeriesOptionsType
		)

		chartData.push(
			{
				name: 'Vacinações agendadas',
				data: data.map(item => item.quantidadeVacinacoes),
				color: '#00e272'
			} as SeriesOptionsType
		)

		const chartTitle = 'Quantidade de Vacinações por Campanha';
		const yAxisTitle = 'Total de Vacinações';
		const columnStacking = 'normal';

		this.campaignsColumnChart = this.chartService.setColumnChart(chartTitle, yAxisTitle, chartCategories, chartData, columnStacking);
	}

	loadExamsByMonth(){
		const subscription = this.dashboardService.getExamsByMonth()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe(data => {
			this.setColumnChartExams(data)
		});

		this.subscriptions.push(subscription);
	}

	setColumnChartExams(data: ExamByMonth[]){
		const currentMonth = new Date().getMonth();
		const allMonths = [...months, ...months];
		const last6Months = allMonths.slice(currentMonth - 5, currentMonth + 1);

		const clinicalExams = data.filter(exam => exam.tipoExame === ExamType.clinico);
		const complementaryExams = data.filter(exam => exam.tipoExame === ExamType.complementar);

		const clinicalExamChartData = last6Months.map(item => {
			const exam = clinicalExams.find(exam => exam.mes === item.index);
			return exam ? exam.quantidade : 0;
		});

		const complementaryExamChartData = last6Months.map(item => {
			const exam = complementaryExams.find(exam => exam.mes === item.index);
			return exam ? exam.quantidade : 0;
		});

		const chartCategories: string[] = last6Months.map(item => item.month);
		const chartData: SeriesOptionsType[] = [];

		chartData.push(
			{
				name: 'Exame Clínico',
				data: clinicalExamChartData
			} as SeriesOptionsType
		);

		chartData.push(
			{
				name: 'Exame Complementar',
				data: complementaryExamChartData
			} as SeriesOptionsType
		);

		const chartTitle = 'Exames realizados (Últimos 6 meses)';
		const yAxisTitle = 'Exames';

		this.examsChart = this.chartService.setColumnChart(chartTitle, yAxisTitle,chartCategories, chartData);
	}

	loadCampaigns(){
		const subscription = this.vaccination.getCampaigns()
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe((campaigns) => {
			this.campaigns = campaigns;

			const subscription = this.currentCampaign.valueChanges.subscribe(
				id => this.loadQuantityByCampaign(id)
			);

			this.subscriptions.push(subscription);

			this.currentCampaign.setValue(this.campaigns[0].idCampanha);
		});

		this.subscriptions.push(subscription);
	}

	loadQuantityByCampaign(id: number){
		const subscription = this.dashboardService.getQuantityByCampaign(id)
		.pipe(
			catchError(() => {
				this.notification.openErrorSnackBar("Ocorreu um erro. Tente novamente mais tarde.");
				return EMPTY;
			})
		)
		.subscribe(data => {
			this.setPieChartCampaign(data)
		});

		this.subscriptions.push(subscription);
	}

	setPieChartCampaign(data: CampaignStatusQuantity[]){
		const chartData: PointOptionsObject[] = [
			{
				name: 'Pendente',
				description: `${data.find(item => item.status == Status.pendente)!.quantidade}`,
				y: data.find(item => item.status == Status.pendente)!.quantidade
			},
			{
				name: 'Concluído',
				description: `${data.find(item => item.status == Status.concluido)!.quantidade}`,
				y: data.find(item => item.status == Status.concluido)!.quantidade
			},
			{
				name: 'Atrasado',
				description: `${data.find(item => item.status == Status.atrasado)!.quantidade}`,
				y: data.find(item => item.status == Status.atrasado)!.quantidade
			},
			{
				name: 'Cancelado',
				description: `${data.find(item => item.status == Status.cancelado)!.quantidade}`,
				y: data.find(item => item.status == Status.cancelado)!.quantidade
			}
		]

		const chartTitle = 'Status por Campanha de Vacinação';

		this.campaignsPieChart = this.chartService.setPieChart(chartTitle, chartData);
	}

}
