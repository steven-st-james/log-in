import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStateService } from './services/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userState$!: Observable<boolean>;
  constructor(private state: UserStateService) {}
  ngOnInit() {

    this.userState$ = this.state.localUser.pipe(map(user => {
      return user.email === '';
    }))
  }
}
