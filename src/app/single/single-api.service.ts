import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { APIService } from '../shared/api.interface';
import { Photo } from '../shared/photo.interface';
import { User } from '../shared/user.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/observable/forkJoin';

interface PhotoLink {
  id: number;
  link: string;
}

interface UserLink {
  id: number;
  link: string;
}

@Injectable()
export class SingleAPIService implements APIService {
  static baseUrl: string = 'http://localhost:4300/single/';

  constructor(
    private http: Http
  ) {}

  public feed(offset?: number, limit?: number): Observable<Photo[]> {
    let url = 'feed';

    if (offset && limit) {
      url += `/${offset}-${limit}`;
    }

    return this.photoLinks(this.get(url));
  }

  public photo(id: number): Observable<Photo> {
    return this.get('photo/' + id);
  }

  private photoLinks(photos: Observable<PhotoLink[]>): Observable<Photo[]> {
    return photos.mergeMap(results => {
      const reqs = results.map(photo => {
        return this.get(photo.link);
        // TODO get also the author
      });

      return Observable.forkJoin(reqs);
    }) as Observable<Photo[]>;
  }

  public me(): Observable<User> {
    return this.userLink(this.get('me'));
  }

  public user(id: number): Observable<User> {
    return this.get('users/' + id);
  }

  private userLink(user: Observable<UserLink>): Observable<User> {
    return user.mergeMap(result => this.get(result.link));
  }

  private get(url: string): Observable<any> {
    return this.http.get(SingleAPIService.baseUrl + url)
      .map(result => result.json());
  }
}
