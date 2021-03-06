import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _configUrl =
    'https://pxnet2.stat.fi:443/PXWeb/api/v1/fi/StatFin/kou/vkour/statfin_vkour_pxt_12bq.px';

  constructor(private http: HttpClient) {}

  getConfig(body): Observable<any> {
    return this.http.post(this._configUrl, body);
  }
}
