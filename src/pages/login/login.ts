import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoreService } from '../../core'
import { InAppBrowser } from 'ionic-native';
import { HomePage } from '../home/home'
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  subInAppBrowser: any;
  response_type = 'token'
  client_id = '3MVG9rFJvQRVOvk6uIeVFlWGF2Ytz139FqHr80QxmBqZ.JbBnEsx92srF694Q4QiW4m8HIfXokFAlNexsvCer';
  redirect_uri = window.cordova?'https://login.salesforce.com/services/oauth2/success':'http://localhost:8100/';

  constructor(
    private store: StoreService,
    private navCtrl: NavController,
    private params: NavParams) {}

  ngOnInit() {
    console.log('ngOnInit login', window.location.hash)

    const fragments = this.params.get('hash') || window.location.hash
    if(fragments && fragments.indexOf('access_token') > -1) {
      //we remove the '#'
      this.handleFragments(fragments.substring(1));
    }
  }

  ngOnDestroy() {
    this.subInAppBrowser && this.subInAppBrowser.unsubscribe()
  }

  handleFragments(fragments) {
    let credentials = {}
    for(let fragment of fragments.split('&')) {
      let key = fragment.split('=')[0]
      let value = fragment.split('=')[1]
      credentials[ window.decodeURIComponent(key) ] = window.decodeURIComponent(value)
    }
    this.store.create('credentials', credentials)
    console.log('Redirecting to Home')

    this.navCtrl.setRoot(TabsPage);
  }

  authorize() {
    console.log('authorize')
    const url = `https://login.salesforce.com/services/oauth2/authorize?response_type=${this.response_type}&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}`

    let inAppBrowserRef = new InAppBrowser(url, '_blank', 'location=no,toolbar=no');
    this.subInAppBrowser = inAppBrowserRef.on('loadstop').subscribe((params) => {
      if(params.url.startsWith('https://login.salesforce.com/services/oauth2/success')) {
        inAppBrowserRef.close();
        this.handleFragments(params.url.split('#')[1]);
      }
      console.log('loadStopCallBack', JSON.stringify(params))
    }, err => {
      console.log("InAppBrowser Loadstop Event Error: " + err)
    });
  }

}
