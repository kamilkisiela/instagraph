import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { APIService } from '../shared/api.interface';
import { User } from '../shared/user.interface';
import { Photo } from '../shared/photo.interface';

import 'rxjs/add/operator/map';

@Injectable()
export class MultipleAPIService implements APIService {

  static baseUrl: string = 'http://localhost:4300/multiple/';

  constructor(
    private http: Http
  ) {}

  public feed(offset?: number, limit?: number): Observable<Photo[]> {
    let url = 'feed';

    if (offset && limit) {
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

  private get(url: string): Observable<any> {
    return this.http.get(MultipleAPIService.baseUrl + url)
      .map(result => result.json());
  }
}