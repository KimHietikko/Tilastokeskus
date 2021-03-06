import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.showConfig();
  }

  showConfig() {
    let body = {
      query: [
        {
          code: 'Vuosi',
          selection: {
            filter: 'item',
            values: ['2019'],
          },
        },
        {
          code: 'Alue',
          selection: {
            filter: 'item',
            values: ['KU179'],
          },
        },
        {
          code: 'Koulutusaste',
          selection: {
            filter: 'item',
            values: ['SSS', '3T8', '3', '4', '5', '6', '7', '8', '9'],
          },
        },
      ],
      response: {
        format: 'json-stat',
      },
    };
    this.apiService.getConfig(body).subscribe((res) => {
      console.log(res);
    });
  }
}
