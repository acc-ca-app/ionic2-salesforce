import { Component, ViewChild } from '@angular/core';
import { Platform, App, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { StoreService } from '../core';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@Component({
  template: `<ion-nav #nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  rootPage = TabsPage;

  constructor(
    private platform: Platform,
    private store: StoreService,
    private app: App) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngAfterViewInit() {
    console.log('going on the login page', window.location.hash)
    this.nav.setRoot(LoginPage, {
      hash: window.location.hash
    });

    this.app.viewDidEnter.subscribe((event) => {
      console.log('viewDidEnter', event)
    })
  }



}
