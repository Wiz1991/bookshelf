import { Component } from '@angular/core';
import { BookService } from 'src/app/api/book.service';
import { UserService } from 'src/app/api/user.service';
import { Rating } from 'src/app/models/rating.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  books$ = this.booksService.getAll();

  constructor(
    private readonly booksService: BookService,
    private readonly userService: UserService
  ) {}

  getAverageRating(ratings: Rating[]) {
    if (!ratings.length) return 'N/A';

    const sum = ratings.reduce((prev, curr) => prev + curr.value, 0);

    return sum / ratings.length;
  }

  onRateClick() {}

  onReserve(bookId: string) {}
}
