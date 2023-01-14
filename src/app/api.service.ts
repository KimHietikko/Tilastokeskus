import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _configUrl =
    'https://pxdata.stat.fi/PxWeb/api/v1/fi/Postinumeroalueittainen_avoin_tieto/2022/paavo_pxt_12f7.px';

  constructor(private http: HttpClient) {}

  getConfig(body): Observable<any> {
    return this.http.post(this._configUrl, body);
  }

  getVariablesAndPostCodes(): Observable<any> {
    return this.http.get(this._configUrl);
  }
}
