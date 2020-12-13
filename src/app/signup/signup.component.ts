import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { NgForm } from '@angular/forms';
import { User } from '../users/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  validData: boolean;

  constructor(private sharedService:SharedService, private router:Router) { }

  ngOnInit(): void {
  }

  signUp(formsValue: NgForm){
    const user: User = formsValue.value;
    this.sharedService.addUser(user).subscribe(
      (data: User) =>{
        // console.log(data);
        if(data== null){
          this.validData = true;
          console.log('Error Occured');
        }else{
          this.validData = false;
          console.log(data,'Inserted Successfully')
          this.router.navigate(['login'])
        }
      },
      error => {
        console.log('Error Occured');
      }
    )
    
    
  }

  gotoLogin(){
    this.router.navigate(['login']);
  }
}
