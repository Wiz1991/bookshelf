import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
    password: new FormControl('', Validators.required),
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
    if (this.userService.getCurrentUser().value !== null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const payload = this.form.value;

    this.userService
      .signUp(payload as User)
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/');
        })
      )
      .subscribe();
  }
}
