export interface Order {
  id: string;
  bookId: string;
  userId: string;
  status: 'delivered' | 'delivering' | 'cancelled';
}
