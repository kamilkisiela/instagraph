import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { APIService } from '../shared/api.interface';
import { Photo } from '../shared/photo.interface';
import { User } from '../shared/user.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/toPromise';
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

  public like(id: number, value: boolean): Promise<Photo> {
    return this.post('photo/like', {
      id,
      value,
    }).toPromise();
  }

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

  private photoLinks(photosObs: Observable<PhotoLink[]>): Observable<Photo[]> {
    return photosObs.mergeMap((photos: PhotoLink[]) => {
      const photoReqs = photos.map((photoLink: PhotoLink) => {
        return this.get(photoLink.link)
          .mergeMap(photo => this.get(photo.author.link), (photo, author) => {
            photo.author = author;
            return photo;
          });
      });

      // TODO get also the author
      return Observable.forkJoin(photoReqs);
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
    return this.http.get(this.absoluteUrl(url))
      .map(result => result.json());
  }

  private post(url: string, body: Object): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.post(this.absoluteUrl(url), JSON.stringify(body), options)
      .map(result => result.json());
  }

  private absoluteUrl(url: string) {
    return SingleAPIService.baseUrl + url;
  }
}
