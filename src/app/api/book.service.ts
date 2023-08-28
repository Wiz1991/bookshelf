import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Rating } from 'src/app/models/rating.model';

@Injectable()
export class BookService {
  private readonly BASE_URL = 'http://localhost:3000/books';
  constructor(private readonly httpService: HttpClient) {}

  parseFilters(filters: {
    publisher?: string;
    title?: string;
    price?: number;
    pages?: number;
    genre?: string;
  }) {
    return Object.entries(filters)
      .filter(([_, value]) => !!value)
      .reduce<{ [key: string]: any }>((prev, [key, value]) => {
        if (typeof value === 'string') prev[`${key}_like`] = value;
        else prev[`${key}_gte`] = value.toString();

        return prev;
      }, {});
  }

  getAll(filters?: any) {
    const params = this.parseFilters(filters);
    return this.httpService.get<Book[]>(
      `${this.BASE_URL}?_embed=ratings&limit=50`,
      {
        params,
      }
    );
  }

  addRating(bookId: string, userId: string, value: number) {
    return this.httpService.post<Rating>(`${this.BASE_URL}/${bookId}/ratings`, {
      userId,
      value,
      bookId,
      id: Math.floor(Math.random() * 10000),
    });
  }
}
