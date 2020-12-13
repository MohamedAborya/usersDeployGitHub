import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { User } from '../users/user.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  subscription:Subscription;
  constructor(private sharedService: SharedService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    // this.user = this.sharedService.user;
    this.user = JSON.parse(localStorage.getItem('Logger'));
  }

  editProfile(id: number){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

}
