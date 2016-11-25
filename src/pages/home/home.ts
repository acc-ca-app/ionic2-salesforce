import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { SalesforceService, StoreService } from '../../core'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  accounts = [];

  constructor(
    private store: StoreService,
    private http: Http,
    private sfdc: SalesforceService) {}

  ionViewDidEnter() {
    this.getAccounts()
  }

  getAccounts() {
    console.log('get Accounts!')
    this.sfdc
      .request('GET', 'query', {q: 'Select Id, Name From Account'})
      .subscribe((accounts) => {
        console.log('accounts', accounts)
        this.accounts = accounts.records
    }, (errors) => {
        console.log('Fetch Account Errors', errors)
    })
  }
}
