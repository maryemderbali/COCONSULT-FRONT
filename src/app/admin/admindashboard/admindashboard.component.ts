import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { StatService } from 'src/app/_services/Stat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private statservice:StatService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
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
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
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
  ngOnInit() {  

      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      this.statservice.getUsersByRoles().subscribe(data => {
        const labels = Object.keys(data); // Extract roles
        const series = [Object.values(data)]; // Extract counts
      
        const dataCompletedTasksChart: any = {
          labels: labels,
          series: series
        };
      
        const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: Math.max(...Object.values(data) as number[]) + 1, // set the high as the biggest value + 1 for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
        }
      
        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
      
        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);
      });

      this.statservice.getUsersPerDay().subscribe(data => {
        const labels = Object.keys(data).map(dateStr => {
          const date = new Date(dateStr);
          return `${date.getDate()}-${date.getMonth() + 1}`; // Extract day and month
        });
         const series = [Object.values(data)];
        var datawebsiteViewsChart = {
          labels: labels,
          series: series
        };
        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: Math.max(...Object.values(data) as number[]) + 1, // set the high as the biggest value + 1 for a better look
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
        };
        var responsiveOptions: any[] = [
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
      });
    }
}