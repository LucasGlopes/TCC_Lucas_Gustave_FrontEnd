import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { OptionsStackingValue, PointOptionsObject, SeriesOptionsType } from 'highcharts';

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
                    showInLegend: true,
                    
                }
            },
            series : [{
                type: 'pie',
                data: chartData
            }]
        })

        return newChart;
    }

    setColumnChart(
        title: string, 
        yAxisTitle: string, 
        chartCategories: string[], 
        chartData: SeriesOptionsType[],
        columnStacking: OptionsStackingValue | undefined = undefined
    ){
        const newChart = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: title,
                align: 'center'
            },
            xAxis: {
                categories: chartCategories,
                crosshair: true,
                accessibility: {
                    description: yAxisTitle
                }
            },
            yAxis: {
                min: 0,
                allowDecimals: false,
                title: {
                    text: yAxisTitle
                }
            },
            tooltip: {
                valueSuffix: ''
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: columnStacking,
                    dataLabels: {
                        enabled: false,
                        style: {
                            fontSize: '14px',
                        }
                    }
                }

            },
            series: chartData
        });

        return newChart;
    }
   
}
