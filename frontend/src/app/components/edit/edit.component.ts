import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { Router } from '@angular/router';
export interface PasswordUpdate {
  oldPassword: string;
  newPassword: string;
  token: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  hide = true;
  editForm!: FormGroup;
  userId: number | undefined;
  token: string | undefined;
  constructor(private httpService: HttpServiceService, private state: UserStateService, private router: Router) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    this.state.localUser.subscribe(user => {
      this.userId = user.id;
      this.token = user.token;
      console.log('the user-----', user)
    })
  }

  handleUpdate(payload: PasswordUpdate) {
    console.log('UPDATE', payload, this.userId!)
    this.httpService.updatePassword(payload, this.userId!, this.token!).subscribe(result => {
      
      this.router.navigate([`logged-in`]);
    })
    
  }

}
