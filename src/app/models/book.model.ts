import { Rating } from 'src/app/models/rating.model';

export enum Genre {
  Action,
  Romance,
  Adventure,
  Thriller,
  Horror,
}

export interface Book {
  id: string;
  publisher: string;
  title: string;
  genre: Genre;
  pages: number;
  datePublished: Date;
  price: number;
  ratings: Rating[];
}
