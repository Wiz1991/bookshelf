import { HttpClient } from '@angular/common/http';
import { Expansion } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser = new BehaviorSubject<Omit<User, 'password'> | null>(
    null
  );

  private readonly BASE_HREF = 'http://localhost:3000/users';
  constructor(private readonly httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .get<User[]>(`${this.BASE_HREF}`, {
        params: {
          email,
        },
      })
      .pipe(
        map(([{ password: pass, ...user }]) => {
          if (pass !== password) {
            throw new Error('Email or password is wrong.');
          }

          this.currentUser.next(user);

          return user;
        })
      );
  }

  signUp(user: Omit<User, 'id'>) {
    return this.httpClient.post<User>(`${this.BASE_HREF}`, user).pipe(
      map((user) => {
        this.currentUser.next(user);
      })
    );
  }

  updateProfile(user: User) {
    return this.httpClient
      .patch<User>(`${this.BASE_HREF}/${user.id}`, user)
      .pipe(
        tap((u) => {
          this.currentUser.next(u);
        })
      );
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.currentUser.next(null);
  }
}
