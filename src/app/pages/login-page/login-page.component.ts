import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  userService = inject(UserService)
  loginForm: FormGroup;
  router = inject(Router)
  
  
  constructor(private fb: FormBuilder)  {
      this.loginForm = this.fb.group({
        EmailId: ["", Validators.required],
        Password: ["", Validators.required]
      })
  }


  onLogin() {
    const loginData = {
      EmailId: this.loginForm.value.EmailId,
      Password: this.loginForm.value.Password
    }
   
   
    this.userService.onLogin(loginData).subscribe((res) => {
      if(res.result) {
 
        localStorage.setItem("angular18TokenData", JSON.stringify(res.data))
        this.router.navigateByUrl("/dashboard")
      } else {
        console.log(res.message)
      }
      }, error => {
        alert('wrong credentials')
      }
  
  
  )
  }

}
