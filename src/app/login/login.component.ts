import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { LoginDto } from './loginDto';
import { NgForm } from '@angular/forms';
import { User } from '../users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dto: LoginDto ;
  validUser: boolean;

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.dto = {
      userName: '',
      password: ''
    };
  }

  signUp(){
    this.router.navigate(['signup']);
  }

  onSubmit(formValue: NgForm){
    const dto:LoginDto = formValue.value;
    this.sharedService.login(dto).subscribe(
      data=>{
        if(data != null){
          console.log(data.id,'login')
          let key = 'Logger';
          localStorage.setItem(key, JSON.stringify(data));
          localStorage.setItem('isLogged','true');
          this.sharedService.isLogged.emit(true);
          this.router.navigate(['users']);
          this.sharedService.user = data;
          this.validUser = false;
        }else{
          localStorage.setItem('isLogged','false');
          this.sharedService.isLogged.emit(false);
          this.validUser = true;
          console.log(data)
        }
      },
      error =>{
        console.log(error)
      }
    );
    // console.log(this.sharedService.isLogged);
  }
  login(dto: LoginDto){
    this.sharedService.login(dto);
  }

}
