import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)
  constructor() { }

  onLogin(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("https://freeapi.gerasim.in/api/JWT/login", data)
  }

  getUsers() {
    return this.http.get("https://freeapi.gerasim.in/api/JWT/GetAllUsers")
  }
}
