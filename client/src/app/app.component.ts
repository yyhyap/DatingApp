import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// OnInit >>> comes after the constructor
export class AppComponent implements OnInit{
  title = 'The Dating app';
  users: any;

  constructor(private accountService: AccountService)
  {

  }

  ngOnInit(): void
  {
    this.setCurrentUser();
  }

  // check whether localStorage has the information of 'user'
  // if yes, assign 'user' to currentUserSource
  setCurrentUser()
  {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}
