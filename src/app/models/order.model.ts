export interface Order {
  id: string;
  bookId: string;
  userId: string;
  status: 'deliverd' | 'delivering' | 'cancelled';
}
