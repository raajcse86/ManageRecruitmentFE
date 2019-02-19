import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { USER_ROLE } from './_services/jwtauth-services.service';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  showHead: any;
  username: string;
  options = ["Approvals", "Logout"];
  optionSelected: any;
  role: String;
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
          this.username = sessionStorage.getItem('authenticaterUser');
        }
      }
    });
  }

  ngOnInit() {
    this.role = sessionStorage.getItem(USER_ROLE);
    console.log("User role is ::::: "+this.role);
  }
  onOptionSelected(event) {
    console.log(event); //option value will be sent as event
  }


}
