import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { find } from 'lodash';

@Component({
    selector: 'app-front-page',
    templateUrl: './front-page.component.html',
    styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
    multi: any[] = [];
    view: any[] = [700, 700];

    checks: Array<any> = [];

    // options
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Postinumero';
    yAxisLabel: string = 'Lukumäärä';
    timeline: boolean = true;

    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };

    checkoutForm = this.formBuilder.group({
        postnumber: '',
        myChoices: new FormArray([], [Validators.required]),
        postNumbers: new FormControl([], [Validators.required])
    });

    postNumberList: Array<any> = [];

    constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
        this.fetchLists();
    }

    fetchLists() {
        this.apiService.getVariablesAndPostCodes().subscribe(
            res => {
                res?.variables[0]?.values.forEach((row, index) => {
                    this.postNumberList.push({
                        description: res?.variables[0]?.valueTexts[index],
                        value: row
                    });
                });

                res?.variables[1]?.values.forEach((row, index) => {
                    this.checks.push({
                        description: res?.variables[1]?.valueTexts[index],
                        value: row
                    });
                });
            },
            err => {
                console.log('Fail');
            }
        );
    }

    submitValues() {
        let body = {
            query: [
                {
                    code: 'Postinumeroalue',
                    selection: {
                        filter: 'item',
                        values: this.checkoutForm.get('postNumbers').value
                    }
                },
                {
                    code: 'Tiedot',
                    selection: {
                        filter: 'item',
                        values: this.checkoutForm.get('myChoices').value
                    }
                }
            ],
            response: {
                format: 'json'
            }
        };

        let dataSet = [];
        this.checkoutForm.get('postNumbers').value?.forEach(city => {
            dataSet.push({ name: city, series: [] });
        });

        this.apiService.getConfig(body).subscribe(
            res => {
                dataSet.forEach((city, cityIndex) => {
                    let postNumberAndName = find(this.postNumberList, function (o) {
                        return o.value === city.name;
                    });

                    res.data[cityIndex].values.forEach((element, elementIndex) => {
                        city.name = res.data[cityIndex].key;
                        city.series.push({
                            name: res.columns[elementIndex + 1].text,
                            value: element
                        });
                    });
                });

                this.multi = dataSet;
            },
            err => {
                console.log('Fail');
            }
        );
    }

    onCheckChange(event) {
        const formArray: FormArray = this.checkoutForm.get('myChoices') as FormArray;

        /* Selected */
        if (event.target.checked) {
            // Add a new control in the arrayForm
            formArray.push(new FormControl(event.target.value));
        } else {
            /* unselected */
            // find the unselected element
            let i: number = 0;

            formArray.controls.forEach((ctrl: FormControl) => {
                if (ctrl.value == event.target.value) {
                    // Remove the unselected element from the arrayForm
                    formArray.removeAt(i);
                    return;
                }

                i++;
            });
        }
    }
}
