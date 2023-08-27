import { Component } from '@angular/core';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user = this.userService.getCurrentUser();

  constructor(public readonly userService: UserService) {}
}
