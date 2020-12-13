import { Injectable, EventEmitter } from '@angular/core';
import { User } from './users/user.model';
import { Observable, Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginDto } from './login/loginDto';
import { logging } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  allUsers: User[];
  user: User;
  url:string;
  isLogged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8080/api';
  }

  
getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

  getUserById(id: number){
    return this.http.get<User>(this.url + '/users/' + id);
    
  }

  addUser(user:User):Observable<User> {
    return this.http.post<User>(this.url + '/users/add', user);
  }

  editUser(user:User, id:number):Observable<User>{
    return this.http.put<User>(this.url+'/users/edit/' + id,user);
  }

  deleteUser(id: number) {
    this.http.put(this.url+'/users/'+id,null).subscribe(
      data=>{
        console.log('Deleted Successfully');
      },
      error=>{
        console.log('Error Occured');
      }
    );
  }

  login(dto:LoginDto): Observable<User>{
    return this.http.post<User>(this.url + '/login', dto);
  }

  signup(user: User) {
    this.addUser(user);
  }

  getUserByUserName(name: string){
    return this.http.get<User>('http://localhost:8080/api/user/' + name);
  }
}
