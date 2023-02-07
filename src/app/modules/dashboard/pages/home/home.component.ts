import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

interface Chart {
	title: string;
	data: ChartData<'doughnut'>;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: [],
})
export class HomeComponent {
	graphics: Chart[] = [
		{
			title: 'Pacientes',
			data: {
				labels: ['hombres', 'mujeres'],
				datasets: [{ data: [316, 458] }],
			},
		},
		{
			title: 'Edades',
			data: {
				labels: ['niños', 'jovenes', 'adultos', 'ancianos'],
				datasets: [{ data: [130, 119, 424, 236] }],
			},
		},
		{
			title: 'áreas',
			data: {
				labels: [
					'dermatología',
					'neurología',
					'oncología',
					'cardiología',
					'pediatría',
				],
				datasets: [{ data: [100, 35, 170, 89, 221] }],
			},
		},
		{
			title: 'Cuartos',
			data: {
				labels: ['ocupados', 'desocupados'],
				datasets: [{ data: [234, 72] }],
			},
		},
	];

	doughnutChartType: ChartType = 'doughnut';
	doughnutChartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
	};
}
