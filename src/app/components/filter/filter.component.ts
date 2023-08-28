import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  form = new FormGroup({
    publisher: new FormControl(''),
    genre: new FormControl(''),
    title: new FormControl(''),
    price: new FormControl(''),
    pages: new FormControl(''),
  });

  @Output()
  onFiltersChange = new EventEmitter<{
    publisher?: string;
    genre?: string;
    title?: string;
    price?: string;
    pages?: string;
  }>();

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap((value) => {
          this.onFiltersChange.emit(value as any);
        })
      )
      .subscribe();
  }

  onClearFilters() {
    this.form.setValue({
      genre: null,
      pages: null,
      price: null,
      publisher: null,
      title: null,
    });
  }
}
