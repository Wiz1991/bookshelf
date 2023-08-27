import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Rating } from 'src/app/models/rating.model';

@Injectable()
export class BookService {
  private readonly BASE_URL = 'http://localhost:3000/books';
  constructor(private readonly httpService: HttpClient) {}

  getAll(filters?: Partial<Omit<Book, 'id'>>) {
    return this.httpService.get<Book[]>(
      `${this.BASE_URL}?_embed=ratings&limit=50`,
      {
        params: filters as any,
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
