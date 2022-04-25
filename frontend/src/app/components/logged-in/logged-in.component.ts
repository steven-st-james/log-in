import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStateService } from 'src/app/services/user-state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})
export class LoggedInComponent implements OnInit {
  user!: User;
  constructor(private route: ActivatedRoute, private userService: UserStateService, private router: Router) { }

  ngOnInit(): void {


    this.userService.localUser.subscribe(result => {
      console.log('Log In', result)
      if(result.email === '') {
        this.router.navigate(['login']);
      }
      this.user = result as User;
    });
  }

  handleChangePassword() {
    this.router.navigate(['edit']);
  }

}
