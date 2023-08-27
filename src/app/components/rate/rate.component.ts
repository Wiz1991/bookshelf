import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent {
  value: number = 0;

  constructor(public dialogRef: MatDialogRef<RateComponent>) {}

  onStarClick(event: MouseEvent) {
    event.stopPropagation();
    this.value = Number((event.target as HTMLElement).dataset['star']);
  }
}
