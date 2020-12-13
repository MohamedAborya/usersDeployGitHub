import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../users/user.model';
import { SharedService } from '../../shared.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditingComponent implements OnInit {

  user: User;
  id:number;

  constructor(
    private sharedService: SharedService, 
    private router: Router, 
    private route: ActivatedRoute) {
      // override the route reuse strategy
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
    }

    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
          // if you need to scroll back to top, here is the right place
          window.scrollTo(0, 0);
        }
    });
  }

  ngOnInit(): void {
    this.user = this.getUserFromLocal();
    this.id = this.user.id;
  }
  onSubmit(formValue: NgForm){
    let editted_user:User = formValue.value;
    this.sharedService.editUser(editted_user, this.id).subscribe(
      (data: User) =>{
        if(data != null){
          localStorage.setItem('Logger',JSON.stringify(data));
          this.getUserFromLocal();
          this.router.navigate(['../'],{relativeTo: this.route})
        }
      },
      error =>{
        console.log('Error Occured');
      }
    );
  }

  getUserFromLocal(): User {
    return JSON.parse(localStorage.getItem('Logger'));
  }
}
