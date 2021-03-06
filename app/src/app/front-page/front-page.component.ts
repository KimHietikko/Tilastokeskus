import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  multi: any[] = [];
  view: any[] = [700, 700];
  cities = ['KU179', 'KU232', 'KU301'];

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
            values: ['2019', '2018', '2017'],
          },
        },
        {
          code: 'Alue',
          selection: {
            filter: 'item',
            values: this.cities,
          },
        },
      ],
      response: {
        format: 'json',
      },
    };

    this.apiService.getConfig(body).subscribe(
      (res) => {
        console.log(res);
        let dataSet = [];
        this.cities.forEach((city) => {
          dataSet.push({ name: city, series: [] });
        });

        res.data.forEach((element) => {
          dataSet.forEach((city) => {
            if (element.key[1] === city.name) {
              city.series.push({
                name: element.key[0],
                value: element.values[0],
              });
            }
          });
        });

        this.multi = dataSet;
      },
      (err) => {
        console.log('Fail');
      }
    );
  }
}
