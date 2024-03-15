
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const BASE_URL = 'http://localhost:1200/sbi/api/v1/account'

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  http = inject(HttpClient);

  constructor() { }

  createAccount(account: any) {
    return this.http.post(BASE_URL, account)

  }
  logInAccount(account: any) {
    return this.http.post(BASE_URL + "/login", account)
  }
  depositBalance(balance: any) {
    const account = localStorage.getItem('account');
    if (!account)
      location.href = "/signin";

    const accountNumber = account as string;
    return this.http.patch(BASE_URL + "/deposit/" + balance, {}, {
      headers:
      {
        accountNumber
      }
    });
  }
}

