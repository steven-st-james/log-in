import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/services/user-state.service';
export interface LogIn {
  email: string;
  password: string;
}
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: []
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  constructor( private httpService: HttpServiceService, private router: Router, private state: UserStateService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.email])
    })
  }

  handleLogIn(payload: FormGroup): void {
    console.log('LogIn', payload)
    const login = payload.value;
    this.httpService.login(login).subscribe(result => {
      console.log('Log in', result);
      const user = result.data.user;
      this.state.setUser(user, result.data.token);

      this.router.navigate([`logged-in`])
    });
  }

}
