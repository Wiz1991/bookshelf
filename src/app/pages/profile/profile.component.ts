import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user = this.userService.getCurrentUser();

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
    address: new FormControl(''),
    favouriteGenre: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(),
  });

  constructor(
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/');
        return;
      }

      const { id, ...rest } = user;

      this.form.setValue(rest as any);
    });

    if (this.userService.getCurrentUser().value == null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const payload = this.form.value;

    this.userService
      .updateProfile({ ...payload, id: this.user.value?.id } as User)
      .subscribe();
  }
}
