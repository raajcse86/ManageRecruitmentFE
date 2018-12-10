import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent { 
    showHead: any;

    constructor(
        private router: Router,
        public aroute: ActivatedRoute
      ) { 
            router.events.forEach((event) => {
                console.log(event);
            if (event instanceof NavigationStart) {
              if (event['url'] == '/login' || event['url'] == '/login?returnUrl=%2F') {
                this.showHead = false;
              } else {
                // console.log("NU")
                this.showHead = true;
              }
            }
          });
      }
}