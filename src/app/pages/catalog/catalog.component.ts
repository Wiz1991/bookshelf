import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, mergeMap } from 'rxjs';
import { BookService } from 'src/app/api/book.service';
import { OrderService } from 'src/app/api/order.service';
import { UserService } from 'src/app/api/user.service';
import { RateComponent } from 'src/app/components/rate/rate.component';
import { Book } from 'src/app/models/book.model';
import { Order } from 'src/app/models/order.model';
import { Rating } from 'src/app/models/rating.model';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  books$ = this.booksService.getAll();
  user = this.userService.getCurrentUser();
  orders$ = this.user.pipe(
    mergeMap((user) => {
      if (!user) return [];
      return this.orderService.getOrders(user.id);
    })
  );

  constructor(
    private readonly booksService: BookService,
    private readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly orderService: OrderService
  ) {}

  getAverageRating(ratings: Rating[]) {
    if (!ratings.length) return 'N/A';

    const sum = ratings.reduce((prev, curr) => prev + curr.value, 0);

    return sum / ratings.length;
  }

  identify(index: number, item: Book) {
    return index + item.id;
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
            this.books$ = this.booksService.getAll();
          })
        )
        .subscribe();
    });
  }

  getRateButtonText(ratings: Rating[]) {
    const userRating = ratings.find(
      (rating) => rating.userId === this.user.value!.id
    );

    return userRating ? `${userRating.value}★` : 'Rate';
  }

  isRatingDisabled(book: Book, orders: Order[]) {
    return (
      book.ratings.some((rating) => (rating.userId = this.user.value!.id)) ||
      !orders.some(
        (order) => order.bookId === book.id && order.status === 'delivered'
      )
    );
  }

  onReserve(bookId: string) {
    this.orderService
      .addOne({
        bookId,
        status: (['canceled', 'delivered', 'delivering'] as const)[
          Math.floor(Math.random() * 3)
        ] as any,
        userId: this.user.value!.id,
      })
      .pipe(
        map(() => {
          this.orders$ = this.orderService.getOrders(this.user.value!.id);
        })
      )
      .subscribe();
  }

  hasReserved(orders: Order[], book: Book) {
    return orders.some((order) => order.bookId === book.id);
  }
}
