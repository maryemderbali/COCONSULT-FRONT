import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as Chart from 'chart.js'; 
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import {Bilan} from "./Bilan";
import  {BilanService} from "./bilan.service"
@Component({
  selector: 'app-monprofil',
  templateUrl: './monprofil.component.html',
  styleUrls: ['./monprofil.component.css']
})
export class MonprofilComponent implements OnInit {
  bilan:Bilan;

  constructor(private authService: AuthService,private BilanService: BilanService ,private router:Router,) {
  }
  calculer() {
    this.authService.getUserData().subscribe((userData) => {
      const userAuthorities = userData.authorities.map((authority) => authority.authority);
  
      if (userAuthorities.includes("ROLE_Entreprise")) {
        this.router.navigate(['calculentrp/resource']);
      } else {
        this.router.navigate(['calcul/work']); 
      }
    });
  }
  /******************************* */
  private getBilan() {
    this.BilanService.getBilanList().subscribe(
      (data) => {
        this.bilan = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  



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
      /* ----------==========     donuts chart    ==========---------- */

      initializeCarbonFootprintChart(data: number[]) {
        const labels = ['Public Transport', 'Other Modes', 'Vélo'];
        const series = data;
    
        const chartData = {
          labels,
          series: [series]
        };
    
        const options = {
          donut: true,
          donutWidth: 60 , // Adjust the width of the hole in the middle
          donutSolid: true,
          startAngle: 270,
          total: 100, // Set the total value (should be greater than the sum of series)
          showLabel: true
        };
    
        const responsiveOptions: any[] = [
          [
            'screen and (max-width: 640px)',
            {
              donutWidth:  '60%'
            }
          ]
        ];

    
        const carbonFootprintChart = new Chartist.Pie(
          '#carbonFootprintChart', // Replace with the ID of the HTML element where you want to render the chart
          chartData,
          options,
          
          responsiveOptions as any
        );
        const colors = ['#FF5733', '#00AEEF', '#00C851']; // Define colors for each slice

        this.addSliceColors(carbonFootprintChart, colors);
        this.startAnimationForPieChart(carbonFootprintChart);
      }
      startAnimationForPieChart(chart) {
        const animationData = {
          labels: [],
          series: []
        };
      
        // Create an array of labels for your chart segments
        const labels = ['Public Transport', 'transport personel','Vélo',];
      
        // Replace these values with the actual percentages for each segment
        const percentages = [30, 60, 10];
      
        // Populate the animationData object
        animationData.labels = labels;
        animationData.series = percentages;
      
        // Create the initial animation with no data
        chart.update();
      
        // Animate the chart
        setTimeout(() => {
          chart.update(animationData);
        }, 600); // Adjust the duration of the animation (in milliseconds)
      }
      

      addSliceColors(chart, colors) {
        chart.on('draw', function(data) {
          if (data.type === 'slice') {
            // Set color for each slice
            data.element._node.style.fill = colors[data.index];
          }
        });
      }
            /* ----------==========     radar chart    ==========---------- */

            initializeCarbonFootprintRadarChart() {
              const labels = ['+3', '2', '1-0.5', '1'];
              const data = [75, 60, 20, 10, ]; // Example carbon footprint values (you can replace with actual data)
            
              const chartData = {
                labels,
                series: [data]
              };
            
              const options = {
                high: 100, // Set the maximum value on the radar chart
                showArea: true,
                showPoint: true,
                fullWidth: true,
                showLabel: true,
              };
            
              const responsiveOptions: any[] = [];
            
              const carbonFootprintRadarChart = new Chartist.Line(
                '#carbonFootprintRadarChart', // Replace with the ID of the HTML element where you want to render the chart
                chartData,
                options,
                responsiveOptions as any
              );
            
              this.startAnimationForRadarChart(carbonFootprintRadarChart);
            }
            startAnimationForRadarChart(chart) {
              let seq: any, delays: any, durations: any;
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
                      easing: 'ease',
                    },
                  });
                }
              });
            
              seq = 0;
            }
                        

  ngOnInit() {


                /* ----------==========     radar chart    ==========---------- */
                this.initializeCarbonFootprintRadarChart();

          /* ----------==========     donuts chart    ==========---------- */

    const carbonFootprintData = [30, 60, 10]; // Example percentages

    this.initializeCarbonFootprintChart(carbonFootprintData);
  
    
      /* ----------==========     emission par utilisation du PC   ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 10, 8, 11, 8, 6, 2]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 15, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Emission par le regime alimentaire    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12', '8@', '6@', '9@', '12@', '3@', '2@'],
          series: [
              [120, 80, 60, 90, 120, 30, 20]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 200, 
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

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
/************************************************************* */

      this.getBilan();

  }


}
