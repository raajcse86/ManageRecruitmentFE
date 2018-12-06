import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  private sub: any;
  profile: any;
  keys: string[];
  excludable_keys_in_display_mode: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.excludable_keys_in_display_mode = ['candidateName', 'roleOfResponsibilities', 'totalExperience'];
    let snapshot = this.route.snapshot.paramMap.get('slug');
    this.profile = JSON.parse(atob(snapshot));
    this.keys = Object.keys(this.profile);

  }

}
