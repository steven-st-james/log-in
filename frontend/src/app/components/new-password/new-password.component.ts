import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStateService } from 'src/app/services/user-state.service';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  user!: User;
  constructor(private userService: UserStateService, private router: Router) { }

  ngOnInit(): void {
    this.userService.localUser.subscribe(result => {
      if(result.email === '') {
        this.router.navigate(['login']);
      }
      this.user = result as User;
    });
  }

}
