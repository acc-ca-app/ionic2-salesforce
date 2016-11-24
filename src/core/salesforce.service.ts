import {Injectable} from '@angular/core';
import {Http, Headers, Request, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { StoreService } from './store.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class SalesforceService {

  constructor(
    private store: StoreService,
    private http: Http
  ) {}

  public request(method: string, url: string, params: any = {}, data: any = null) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');

    let credentials = this.store.read('credentials');
    if(credentials) {
      credentials = credentials[0];
    }

    if (credentials) {
      headers.append('Authorization', 'Bearer ' + credentials.access_token);
    } else {
      throw 'Not Authentified';
    }

    let parameters: string[] = []
    for (var param in params) {
      parameters.push(param + '=' + (typeof params[param] === 'object' ? JSON.stringify(params[param]) : params[param]))
    }
    url = '/services/data/v38.0/' + url + (parameters ? '?' : '') + parameters.join('&')

    let request = new Request({
      headers: headers,
      method: method,
      url: url,
      body: data ? JSON.stringify(data) : null
    })
    return this.http.request(request)
      .map(res => {
        if(res.text()) {
          return res.json()
        } else {
          return {}
        }
      })
      .catch((error: Response) => {
        let ret
        if(error.headers.get('Content-Type').indexOf('text/plain') > -1) {
          ret = error.text()
        } else {
          ret = error.json().error || 'Server error'
        }
        return Observable.throw(ret)
      })
  }
}