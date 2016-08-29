import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { APIService } from '../shared/api.interface';
import { User } from '../shared/user.interface';
import { Photo } from '../shared/photo.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MultipleAPIService implements APIService {

  static baseUrl: string = 'http://localhost:4300/multiple/';

  constructor(
    private http: Http
  ) {}

  public like(id: number, value: boolean): Promise<Photo> {
    return this.post('photo/like', {
      id,
      value,
    }).toPromise();
  }

  public feed(offset?: number, limit?: number): Observable<Photo[]> {
    let url = 'feed';

    if (limit) {
      if (!offset) {
        offset = 0;
      }
      url += `/${offset}-${limit}`;
    }

    return this.get(url);
  }

  public photo(id: number): Observable<Photo> {
    return this.get('photo/' + id);
  }

  public me(): Observable<User> {
    return this.get('me');
  }

  public user(id: number): Observable<User> {
    return this.get('users/' + id);
  }

  protected get(url: string): Observable<any> {
    return this.http.get(this.absoluteUrl(url))
      .map(result => result.json());
  }

  protected post(url: string, body: Object): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.post(this.absoluteUrl(url), JSON.stringify(body), options)
      .map(result => result.json());
  }

  private absoluteUrl(url: string) {
    return MultipleAPIService.baseUrl + url;
  }
}