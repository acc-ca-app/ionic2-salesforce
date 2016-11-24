import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { SalesforceService, StoreService } from '../../core'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('rootNavController') navCtrl: NavController;

  actionSheet: ActionSheet;
  credentials: any;
  accounts = [];
  response_type = 'token'
  client_id = '3MVG9rFJvQRVOvk6uIeVFlWGF2Ytz139FqHr80QxmBqZ.JbBnEsx92srF694Q4QiW4m8HIfXokFAlNexsvCer';
  redirect_uri = 'http://localhost:8100/';

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public config: Config,
    private route: ActivatedRoute,
    private store: StoreService,
    private http: Http,
    private sfdc: SalesforceService) {}

  ionViewDidLoad() {
    //Small Hack to Allow the Params to be read before the call (avoid remaking constantly the authentication the time being)
    setTimeout(() => {
      this.credentials = this.store.read('credentials')
      if(this.credentials) {
        this.getAccounts()
      }
    })

  }

  getAccounts() {
    this.sfdc
      .request('GET', 'query', {q: 'Select Id, Name From Account'})
      .subscribe((accounts) => {
        console.log('accounts', accounts)
        this.accounts = accounts.records
    })
  }


  authorize() {
    console.log('authorize')
    window.location.href = `https://login.salesforce.com/services/oauth2/authorize?response_type=${this.response_type}&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}`
  }


}
