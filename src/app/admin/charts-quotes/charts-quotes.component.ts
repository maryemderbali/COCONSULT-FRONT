import {Component,  OnInit} from '@angular/core';
import { QuoteService } from '../../_services/quote.service';
import { Quote } from '../../_models/quote';
import Chart from 'chart.js/auto';
import {YEAR} from 'ngx-bootstrap/chronos/units/constants';

@Component({
    selector: 'app-charts-quotes',
    templateUrl: './charts-quotes.component.html',
    styleUrls: ['./charts-quotes.component.css']
})

export class ChartsQuotesComponent implements OnInit {
    validQuotes: Quote[] = [];
    invalidQuotes:Quote[]=[];
    chartInstance: Chart;

    constructor(private quoteService: QuoteService) { }

    ngOnInit(): void {
        this.getValidQuotesByYear();
    }

    getValidQuotesByYear(): void {
        const year = new Date().getFullYear();
        this.quoteService.getQuotesByValidationAndYear(true, year).subscribe((data: Quote[]) => {
            this.validQuotes = data;
            this.generateChart();
        });
    }
    getInvalidQuotesByYear(): void {
        const year = new Date().getFullYear();
        this.quoteService.getQuotesByValidationAndYear(false, year).subscribe((data: Quote[]) => {
            this.invalidQuotes = data;
            this.generateChart();
        });
    }

    generateChart(): void {
        const quoteCountsByYear: { [year: string]: number } = {};

        this.validQuotes.forEach(quote => {
            const year = new Date(quote.creationDate).getFullYear().toString();
            if (quoteCountsByYear[year]) {
                quoteCountsByYear[year]++;
            } else {
                quoteCountsByYear[year] = 1;
            }
        });
        this.invalidQuotes.forEach(quote => {
            const year = new Date(quote.creationDate).getFullYear().toString();
            if (quoteCountsByYear[year]) {
                quoteCountsByYear[year]++;
            } else {
                quoteCountsByYear[year] = 0;
            }
        });

        const labels = Object.keys(quoteCountsByYear);
        const counts = Object.values(quoteCountsByYear);

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        const canvas = document.getElementById('validQuotesChart') as HTMLCanvasElement;
        this.chartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Valid Quotes',
                    data: counts,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Valid Quotes by Month'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Quote Counts'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    }
                }
            }
        });
        const canvass = document.getElementById('invalidQuotesChart') as HTMLCanvasElement;
        this.chartInstance = new Chart(canvass, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'inValid Quotes',
                        data: counts,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'inValid Quotes by year'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Quote Counts'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'year'
                            }
                        }
                    }
                }
            }
        );
    }
}
