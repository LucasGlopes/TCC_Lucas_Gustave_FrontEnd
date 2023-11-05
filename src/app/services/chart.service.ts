import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { PointOptionsObject } from 'highcharts';

@Injectable({
	providedIn: 'root'
})
export class ChartService {

	constructor(
	) { }

	setPieChart(chartTitle: string, chartData: PointOptionsObject[] ){
        const newChart = new Chart({
            chart : {
                type: 'pie',
            },
            title : {
                text: chartTitle,
            },
            tooltip : {
                pointFormat: 'Porcentagem: <b>{point.y}%</b><br/> Quantidade: <b>{point.description}</b>'
            },
            credits: {
                enabled: false
            },
            plotOptions : {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
            
                    dataLabels: {
                        enabled: false           
                    },
                    showInLegend: true
                }
            },
            series : [{
                type: 'pie',
                data: chartData
            }]
        })

        return newChart;
    }

   
}
