import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestapiProvider {
  private baseUrl = 'http://localhost:9810/api/'
  constructor(public http: Http) {
    console.log('Hello RestapiProvider Provider');
  }
}
