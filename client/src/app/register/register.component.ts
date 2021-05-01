import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // getting property from parent component: Home Component
  // @Input() usersFromHomeComponent: any;
  // passing event to parent component: Home Component
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register()
  {
    this.accountService.register(this.model).subscribe(response => {
      this.cancel();
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

  cancel()
  {
    this.cancelRegister.emit(false);
  }

}
