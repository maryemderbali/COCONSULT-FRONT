"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var Chartist = require("chartist");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(statservice) {
        this.statservice = statservice;
    }
    DashboardComponent.prototype.startAnimationForLineChart = function (chart) {
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
    DashboardComponent.prototype.startAnimationForBarChart = function (chart) {
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
    DashboardComponent.prototype.ngOnInit = function () {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
        var _this = this;
        var dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };
        var optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        };
        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);
        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
        this.statservice.getUsersByRoles().subscribe(function (data) {
            var labels = Object.keys(data); // Extract roles
            var series = [Object.values(data)]; // Extract counts
            var dataCompletedTasksChart = {
                labels: labels,
                series: series
            };
            var optionsCompletedTasksChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: Math.max.apply(Math, Object.values(data)) + 1,
                chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
            };
            var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
            // start animation for the Completed Tasks Chart - Line Chart
            _this.startAnimationForLineChart(completedTasksChart);
        });
        this.statservice.getUsersPerDay().subscribe(function (data) {
            var labels = Object.keys(data).map(function (dateStr) {
                var date = new Date(dateStr);
                return date.getDate() + "-" + (date.getMonth() + 1); // Extract day and month
            });
            var series = [Object.values(data)];
            var datawebsiteViewsChart = {
                labels: labels,
                series: series
            };
            var optionswebsiteViewsChart = {
                axisX: {
                    showGrid: false
                },
                low: 0,
                high: Math.max.apply(Math, Object.values(data)) + 1,
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
            _this.startAnimationForBarChart(websiteViewsChart);
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './admindashboard.component.html',
            styleUrls: ['./admindashboard.component.css']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
