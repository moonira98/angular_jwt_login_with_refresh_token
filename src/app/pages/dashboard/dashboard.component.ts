import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userService = inject(UserService)
  users: any [] = []

  ngOnInit() {
    this.getUsers()
    this.userService.$refreshTokenisReceived.subscribe((res: any) => {
      this.getUsers()
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res.data
    })
  }
}
