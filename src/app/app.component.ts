import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { StoreService } from '../core';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav #rootNavController [root]="rootPage">
    <router-outlet></router-outlet>
  </ion-nav>`
})
export class MyApp {
  sub: any
  rootPage = TabsPage;

  constructor(
    private platform: Platform, 
    private route: ActivatedRoute,
    private store: StoreService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.sub = this.route.fragment.subscribe(fragments => {
      console.log('fragments', JSON.parse(JSON.stringify(fragments)))
      if(fragments) {
        const result = {}
        for(let fragment of fragments.split('&')) {
          let key = fragment.split('=')[0]
          let value = fragment.split('=')[1]
          result[ window.decodeURIComponent(key) ] = window.decodeURIComponent(value)
        }
        this.store.create('credentials', result)
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
