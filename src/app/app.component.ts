import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'AdminDashboard';
  logged: boolean = false;

  constructor(private sharedService: SharedService){}

  ngOnInit() {
     this.sharedService.isLogged.subscribe(
      data=>{
        this.logged = data;
        console.log(data);
      }
    )

    // localStorage.setItem('isLogged','false');
    
    this.logged = localStorage.getItem('isLogged') == 'true'?true:false;
  }

}
