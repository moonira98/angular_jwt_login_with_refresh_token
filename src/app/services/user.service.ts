import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginResponse } from '../login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $isRefreshToken = new Subject<boolean>
  
  public $refreshTokenisReceived = new Subject<boolean>

  http = inject(HttpClient)
  
  
  constructor() { 
    this.$isRefreshToken.subscribe((res: any) => {
      this.getRefreshToken()
    })
  }

  onLogin(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("https://freeapi.gerasim.in/api/JWT/login", data)
  }

  getRefreshToken() {
    let parsedData: any
    let localData = localStorage.getItem("angular18TokenData")
    if(localData != null) {
      parsedData = JSON.parse(localData)
    }




    const obj = {
      "emailId": localStorage.getItem("angular18TokenEmailId"),
      "token": "",
      "refreshToken": parsedData.refreshToken
    }


      this.http.post("https://freeapi.gerasim.in/api/JWT/refresh", obj).subscribe((res: any) => {
        localStorage.setItem("angular18TokenData", JSON.stringify(res.data))
        this.$refreshTokenisReceived.next(true)
      })
  }


  getUsers() {
    return this.http.get("https://freeapi.gerasim.in/api/JWT/GetAllUsers")
  }
}
