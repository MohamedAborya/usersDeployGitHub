import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  logged: boolean;
  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {

  }

  gotoLogin(){
    this.sharedService.isLogged.emit(false);
    localStorage.setItem('isLogged','false');
    localStorage.removeItem('Logger');
    this.router.navigate(['login']);
  }

}
