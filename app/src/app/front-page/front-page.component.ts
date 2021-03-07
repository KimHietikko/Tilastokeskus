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
  cities = ['61950', '61980'];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Postal area';
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
          code: 'Postinumeroalue',
          selection: {
            filter: 'item',
            values: this.cities,
          },
        },
        {
          code: 'Tiedot',
          selection: {
            filter: 'item',
            values: ['he_vakiy', 'ko_yl_kork', 'pt_opisk'],
          },
        },
      ],
      response: {
        format: 'json',
      },
    };

    let dataSet = [];
    this.cities.forEach((city) => {
      dataSet.push({ name: city, series: [] });
    });

    this.apiService.getConfig(body).subscribe(
      (res) => {
        console.log(res);

        dataSet.forEach((city, cityIndex) => {
          res.data[cityIndex].values.forEach((element, elementIndex) => {
            city.name = res.data[cityIndex].key;
            city.series.push({
              name: res.columns[elementIndex + 1].text,
              value: element,
            });
          });
        });

        this.multi = dataSet;
      },
      (err) => {
        console.log('Fail');
      }
    );
}
