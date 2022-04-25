import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpServiceService } from 'src/app/services/http-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateService } from '../../services/user-state.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  hide = true;
  constructor(private httpService: HttpServiceService, private router: Router, private userService: UserStateService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  handleRegister(payload: User) {
    console.log('Event', payload)

    this.httpService.register(payload)
    .subscribe(response => {
      console.log('Register', response)
      this.userService.setUser(response, response.data.token)
      this.router.navigate([`logged-in`]);
    })
    
  }
}
