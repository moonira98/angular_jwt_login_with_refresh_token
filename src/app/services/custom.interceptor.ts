import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserService } from './user.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService)

  let parsedData: any
  let localData = localStorage.getItem("angular18TokenData")
  if(localData != null) {
    parsedData = JSON.parse(localData)
  }




  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${parsedData.token}`, // Add Bearer token
    },
  });








  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401) {
        const isConfirm = confirm("do you want to continue?")
        if(isConfirm) {
          userService.$isRefreshToken.next(true)
        }
      }

      return throwError(error)
    })
  )
};
