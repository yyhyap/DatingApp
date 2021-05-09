import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error)
        {
          // for majority of the cases, going to catch the errors within this switch statement
          switch(error.status)
          {
            case 400:
              /*
              HttpErrorResponse {headers: HttpHeaders, status: 400, statusText: "OK", url: "https://localhost:5001/api/account/register", ok: false, …}
                error:
                  errors: {Password: Array(1), Username: Array(1)}
                  status: 400
                  title: "One or more validation errors occurred."
                  traceId: "00-1e2be1705902fe4a8fc2bfaadfdb0705-1f8d923594a16041-00"
                  type: "https://tools.ietf.org/html/rfc7231#section-6.5.1"
               */
              if(error.error.errors)
              {
                const modalStateError = [];
                for (const key in error.error.errors)
                {
                  if(error.error.errors[key])
                  {
                    modalStateError.push(error.error.errors[key]);
                  }
                }
                // flat >>> Returns a new array with all sub-array elements concatenated into it
                throw modalStateError.flat();
              }
              else
              {
                /*
                HttpErrorResponse {headers: HttpHeaders, status: 400, statusText: "OK", url: "https://localhost:5001/api/buggy/bad-request", ok: false, …}
                  error: "This is bad request"
                 */
                this.toastr.error(error.error, error.status);
              }
              break;

            case 401:
              this.toastr.error(error.status === 401 ? "Unauthorized" : error.error, error.status);
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('Something unexpected');
              console.log(error);
              break;
          }
        }
        // if didn't catch the errors, going to return the error
        // try not to hit this
        return throwError(error);
      })
    )
  }
}
