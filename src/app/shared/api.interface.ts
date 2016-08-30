import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PhotoLikeEvent } from '../photos/photos.component';
import { User } from './user.interface';
import { Photo } from './photo.interface';

export interface APIService {
  feed(offset?: number, limit?: number): Observable<Photo[]>;
  photo(id: number): Observable<Photo>;
  me(): Observable<User>;
  user(id: number): Observable<User>;
  like(id: number, value: boolean): Promise<Photo>;
}

export interface APIPhotosComponent {
  offset: number;
  limit: number;
  photos: Photo[];
  feedSub: Subscription;
  onMore(): void;
}
