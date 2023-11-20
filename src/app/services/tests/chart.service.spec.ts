import { TestBed } from '@angular/core/testing';
import { ChartService } from '../chart.service';
import { OptionsStackingValue, PointOptionsObject, SeriesOptionsType } from 'highcharts';


describe('ChartService', () => {
  let service: ChartService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChartService
      ]
    });

    service = TestBed.inject(ChartService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return new pie chart', () => {
		const chartTitle = 'teste';
		const chartData: PointOptionsObject[] = [];

		const resultChart = service.setPieChart(chartTitle, chartData);

		expect(resultChart).toBeTruthy();

  });

	it('should return new column chart', () => {
		const chartTitle = 'teste';
		const yAxisTitle = 'teste';
		const chartData: SeriesOptionsType[] = [];
		const chartCategories: string[] = [];

		const resultChart = service.setColumnChart(chartTitle, yAxisTitle,chartCategories,chartData);

		expect(resultChart).toBeTruthy();

  });
});