import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, mergeMap, tap } from 'rxjs';
import { BookService } from 'src/app/api/book.service';
import { OrderService } from 'src/app/api/order.service';
import { UserService } from 'src/app/api/user.service';
import { RateComponent } from 'src/app/components/rate/rate.component';
import { Book } from 'src/app/models/book.model';
import { Order } from 'src/app/models/order.model';
import { Rating } from 'src/app/models/rating.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  filters$ = new BehaviorSubject<Partial<Book>>({});
  user = this.userService.getCurrentUser();

  orders$ = this.user.pipe(
    mergeMap((user) => {
      if (!user) return [];
      return this.orderService.getOrders(user.id);
    })
  );
  refresh$ = new BehaviorSubject(0);

  books$ = combineLatest([this.orders$, this.filters$, this.refresh$]).pipe(
    mergeMap(([orders, filters]) => {
      return this.booksService.getAll(filters).pipe(
        map((books) => {
          return orders.reduce<(Book & { order: Order })[]>((prev, curr) => {
            const book = {
              order: curr,
              ...books.find((b) => b.id === curr.bookId)!,
            };

            return [...prev, book];
          }, []);
        })
      );
    })
  );

  total$ = combineLatest([this.books$]).pipe(
    map(([books]) => {
      return books.reduce((prev, curr) => prev + curr.price, 0).toFixed(2);
    })
  );

  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly booksService: BookService,
    private readonly dialog: MatDialog
  ) {}

  getAverageRating(ratings: Rating[]) {
    if (!ratings.length) return 'N/A';

    const sum = ratings.reduce((prev, curr) => prev + curr.value, 0);

    return sum / ratings.length;
  }

  onRateClick(bookId: string) {
    let dialogRef = this.dialog.open(RateComponent, {
      height: '200',
      width: '150',
    });

    dialogRef.afterClosed().subscribe((result: number | undefined) => {
      if (result === undefined || result === 0) return;

      this.booksService
        .addRating(bookId, this.user.value!.id, result)
        .pipe(
          map(() => {
            this.refresh$.next(this.refresh$.value + 1);
          })
        )
        .subscribe();
    });
  }
  isRatingDisabled(book: Book & { order: Order }) {
    return (
      book.ratings.some((rating) => rating.userId == this.user.value!.id) ||
      book.order.status !== 'delivered'
    );
  }
  getRateButtonText(ratings: Rating[]) {
    const userRating = ratings.find(
      (rating) => rating.userId === this.user.value!.id
    );

    return userRating ? `Your Rating: ${userRating.value}★` : 'Rate';
  }

  onRemoveOrder(orderId: string) {
    this.orderService
      .remove(orderId)
      .pipe(
        tap(() => {
          this.refresh$.next(this.refresh$.value + 1);
          this.user.next(this.user.value);
        })
      )
      .subscribe();
  }
}
