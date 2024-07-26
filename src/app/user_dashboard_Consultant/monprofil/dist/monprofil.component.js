"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MonprofilComponent = void 0;
var core_1 = require("@angular/core");
var Chartist = require("chartist");
var MonprofilComponent = /** @class */ (function () {
    function MonprofilComponent() {
    }
    MonprofilComponent.prototype.startAnimationForLineChart = function (chart) {
        var seq, delays, durations;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
            else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });
        seq = 0;
    };
    ;
    MonprofilComponent.prototype.startAnimationForBarChart = function (chart) {
        var seq2, delays2, durations2;
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });
        seq2 = 0;
    };
    ;
    /* ----------==========     donuts chart    ==========---------- */
    MonprofilComponent.prototype.initializeCarbonFootprintChart = function (data) {
        var labels = ['Public Transport', 'Other Modes', 'Vélo'];
        var series = data;
        var chartData = {
            labels: labels,
            series: [series]
        };
        var options = {
            donut: true,
            donutWidth: 60,
            donutSolid: true,
            startAngle: 270,
            total: 100,
            showLabel: true
        };
        var responsiveOptions = [
            [
                'screen and (max-width: 640px)',
                {
                    donutWidth: '60%'
                }
            ]
        ];
        var carbonFootprintChart = new Chartist.Pie('#carbonFootprintChart', // Replace with the ID of the HTML element where you want to render the chart
        chartData, options, responsiveOptions);
        var colors = ['#FF5733', '#00AEEF', '#00C851']; // Define colors for each slice
        this.addSliceColors(carbonFootprintChart, colors);
        this.startAnimationForPieChart(carbonFootprintChart);
    };
    MonprofilComponent.prototype.startAnimationForPieChart = function (chart) {
        var animationData = {
            labels: [],
            series: []
        };
        // Create an array of labels for your chart segments
        var labels = ['Public Transport', 'transport personel', 'Vélo',];
        // Replace these values with the actual percentages for each segment
        var percentages = [30, 60, 10];
        // Populate the animationData object
        animationData.labels = labels;
        animationData.series = percentages;
        // Create the initial animation with no data
        chart.update();
        // Animate the chart
        setTimeout(function () {
            chart.update(animationData);
        }, 600); // Adjust the duration of the animation (in milliseconds)
    };
    MonprofilComponent.prototype.addSliceColors = function (chart, colors) {
        chart.on('draw', function (data) {
            if (data.type === 'slice') {
                // Set color for each slice
                data.element._node.style.fill = colors[data.index];
            }
        });
    };
    /* ----------==========     radar chart    ==========---------- */
    MonprofilComponent.prototype.initializeCarbonFootprintRadarChart = function () {
        var labels = ['+3', '2', '1-0.5', '1'];
        var data = [75, 60, 20, 10,]; // Example carbon footprint values (you can replace with actual data)
        var chartData = {
            labels: labels,
            series: [data]
        };
        var options = {
            high: 100,
            showArea: true,
            showPoint: true,
            fullWidth: true,
            showLabel: true
        };
        var responsiveOptions = [];
        var carbonFootprintRadarChart = new Chartist.Line('#carbonFootprintRadarChart', // Replace with the ID of the HTML element where you want to render the chart
        chartData, options, responsiveOptions);
        this.startAnimationForRadarChart(carbonFootprintRadarChart);
    };
    MonprofilComponent.prototype.startAnimationForRadarChart = function (chart) {
        var seq, delays, durations;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function (data) {
            if (data.type === 'area' || data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });
        seq = 0;
    };
    MonprofilComponent.prototype.ngOnInit = function () {
        /* ----------==========     radar chart    ==========---------- */
        this.initializeCarbonFootprintRadarChart();
        /* ----------==========     donuts chart    ==========---------- */
        var carbonFootprintData = [30, 60, 10]; // Example percentages
        this.initializeCarbonFootprintChart(carbonFootprintData);
        /* ----------==========     emission par utilisation du PC   ==========---------- */
        var dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 10, 8, 11, 8, 6, 2]
            ]
        };
        var optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 15,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        };
        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);
        /* ----------==========     Emission par le regime alimentaire    ==========---------- */
        var dataCompletedTasksChart = {
            labels: ['12', '8@', '6@', '9@', '12@', '3@', '2@'],
            series: [
                [120, 80, 60, 90, 120, 30, 20]
            ]
        };
        var optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 200,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        };
        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);
        /* ----------==========     Emission par utilisation du     ==========---------- */
        var datawebsiteViewsChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [170, 150, 170, 170, 150, 150, 40]
            ]
        };
        var optionswebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 200,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
        ];
        var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
    };
    MonprofilComponent = __decorate([
        core_1.Component({
            selector: 'app-monprofil',
            templateUrl: './monprofil.component.html',
            styleUrls: ['./monprofil.component.css']
        })
    ], MonprofilComponent);
    return MonprofilComponent;
}());
exports.MonprofilComponent = MonprofilComponent;
