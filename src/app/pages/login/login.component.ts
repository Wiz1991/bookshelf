import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
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
      .login(payload.email!, payload.password!)
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/');
        })
      )
      .subscribe();
  }
}
