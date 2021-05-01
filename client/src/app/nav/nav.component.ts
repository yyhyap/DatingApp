import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.login(this.model).subscribe(response => {
      // console.log(response);
      this.router.navigateByUrl('/members');
    }, error => {
      console.log(error);
      /* 
      error >>> HttpErrorResponse

      HttpErrorResponse {headers: HttpHeaders, status: 401, statusText: "OK", url: "https://localhost:5001/api/account/login", ok: false, …}
      error: "Invalid username"
      headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
      message: "Http failure response for https://localhost:5001/api/account/login: 401 OK"
      name: "HttpErrorResponse"
      ok: false
      status: 401
      statusText: "OK"
      url: "https://localhost:5001/api/account/login"
      __proto__: HttpResponseBase

      Need to use error.error to get error message
      */
      this.toastr.error(error.error);
    });
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  // checking whether user has logged in before
  // if currentUserSource containing 'user', then 'this.loggedIn' is TRUE
  getCurrentUser()
  {
    this.accountService.currentUser$.subscribe(user => {
    }, error => {
      console.log(error);
    });
  }

}
