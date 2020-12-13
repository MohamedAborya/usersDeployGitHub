import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  selected_id: number;
  display: boolean = true;
  validName: boolean;
  user:User;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  
  constructor(
    private route:ActivatedRoute, 
    private userService: SharedService,
    private router:Router
  ) { 
    // this.reloadComponent();
  }

  reloadComponent() {
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

    this.route.params.subscribe(
      (params: Params) => {
        this.selected_id = +params['id'];
        console.log(this.selected_id);
        if(this.selected_id > 0){
          this.userService.getUserById(this.selected_id).subscribe(
            (data: User)=> {
              this.user = data;
              this.userName = data.userName;
              this.password = data.password;
              this.email = data.email;
              this.phoneNumber = data.phoneNumber;
            },
            error => {
              console.log(error);
            }
          );
        }else{
          this.user = {id:0, userName:'', email:'', password:'', phoneNumber:'', isDeleted: 0}
        }
      } 
    );
    
    // this.reloadComponent();

  }

  addUser(user:User){
    this.userService.addUser(user).subscribe(
      (data: User) =>{
        if(data== null){
          console.log('Error Occured');
          this.validName = true;
        }else{
          console.log(data,'Inserted Successfully');
          this.validName = false;
          this.router.navigate(['users']);
        }
      },
      error => {
        console.log('Error Occured');
      }
    );
    
  }

  editUser(user:User, id:number){
    this.userService.editUser(user, id).subscribe(
      (data: User) =>{
        if(data != null){
          
          if(JSON.parse(localStorage.getItem("Logger")) == data){
            console.log('The Same');
          }
          console.log('Updated Successfully');
          this.router.navigate(['users']);
        }
      },
      error =>{
        console.log('Error Occured');
      }
    );
    // this.reloadComponent();
    
  }

  onSubmit(formValues: NgForm){
    const user:User = formValues.value;
    if(this.selected_id){
      this.editUser(user, this.selected_id);
    }else{
      this.addUser(user);
    }
  }

  clear(formData: NgForm){
    formData.reset();
  }

  close(){
    this.display = false;
    if(this.selected_id){
      this.router.navigate(['../../'],{relativeTo:this.route});
    }else{
      this.router.navigate(['../'],{relativeTo:this.route});
    }
  }

}
