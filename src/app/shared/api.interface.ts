import { User } from './user.interface';
import { Photo } from './photo.interface';

import { Observable } from 'rxjs/Observable';

export interface APIService {
  feed(offset?: number, limit?: number): Observable<Photo[]>;
  photo(id: number): Observable<Photo>;
  me(): Observable<User>;
  user(id: number): Observable<User>;
  like(id: number, value: boolean): Promise<Photo>;
}
