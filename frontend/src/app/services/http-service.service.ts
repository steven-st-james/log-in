import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LogIn } from '../components/log-in/log-in.component';
import { PasswordUpdate } from '../components/edit/edit.component';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  register(payload: User): Observable<any> {
    return this.http.post('http://localhost:4200/pub/register/', {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password
    })
  }

  login(payload: LogIn): Observable<any> {
    return this.http.post('http://localhost:4200/pub/login/', {
      email: payload.email,
      password: payload.password
    })
  }

  updatePassword(payload: PasswordUpdate, id: number, token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('x-token', token);
    console.log('Payload', payload, id, token)
    return this.http.post('http://localhost:4200/api/changePassword/',{
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
      userId: id
    }, {headers})
  }

  
}
