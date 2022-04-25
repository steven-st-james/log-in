import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User} from '../models/user';
const initUser: Partial<User>  = {
  firstName: '',
  lastName: '',
  email: '',
}
@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private user$: BehaviorSubject<Partial<User>> = new BehaviorSubject(initUser);
  public localUser: Observable<Partial<User>> = this.user$.asObservable();
  constructor() { }

  public setUser(payload: any, token: string): void  {
    console.log('setUser', payload)
    const user: Partial<User> = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      loggedIn: payload.success,
      token,
      id: payload.user.id
    }
    return this.user$.next(user);
  }
}
