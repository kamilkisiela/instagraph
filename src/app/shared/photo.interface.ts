import { User } from './user.interface';

export interface Photo {
  id: number;
  author: User;
  url: string;
  createdAt: number;
  likes: number;
  liked: boolean;
}