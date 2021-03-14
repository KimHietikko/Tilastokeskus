import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  multi: any[] = [];
  view: any[] = [700, 700];
  postNumbers = ['61950', '61980'];
  values = ['he_vakiy', 'ko_yl_kork', 'pt_opisk'];

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

  checkoutForm = this.formBuilder.group({
    postnumber: '',
    specs: '',
  });

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.showConfig();
  }

  setLists() {
    console.log('Moi', this.checkoutForm.value.postnumber);
    this.postNumbers = this.checkoutForm.value.postnumber.split(',');

    this.showConfig();
  }

  showConfig() {
    let body = {
      query: [
        {
          code: 'Postinumeroalue',
          selection: {
            filter: 'item',
            values: this.postNumbers,
          },
        },
        {
          code: 'Tiedot',
          selection: {
            filter: 'item',
            values: this.values,
          },
        },
      ],
      response: {
        format: 'json',
      },
    };

    let dataSet = [];
    this.postNumbers.forEach((city) => {
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
}
