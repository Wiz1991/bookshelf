import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Injectable()
export class BookService {
  private readonly BASE_URL = 'http://localhost:3000/books';
  constructor(private readonly httpService: HttpClient) {}

  getAll() {
    return this.httpService.get<Book[]>(
      `${this.BASE_URL}?_embed=ratings&limit=50`
    );
  }

  addRating(bookId: string, userId: string, value: number) {
    return this.httpService.patch(`${this.BASE_URL}/${bookId}/ratings`, {
      userId,
      value,
      bookId,
    });
  }
}
