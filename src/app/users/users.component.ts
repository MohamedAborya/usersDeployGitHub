import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { User } from './user.model';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { SharedService } from '../shared.service';
import { ConfirmationService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {

  cols: any[];
  users: User[];
  selected_id: number;
  display: boolean;
  user: User;
  @Input('chartData')
  set TreeData(data: User[]){
    this.chartData = new Array<TreeNode>();
    this.fillLeaf(this.chartData, -1,data);
  }
  chartData: TreeNode[];
  primeField = 'id';
  parentField = 'role';
  navigationSubscription;

  constructor(
    private router:Router, 
    private route: ActivatedRoute, 
    private userService: SharedService,
    private confirmationService: ConfirmationService
  ) { 
    // this.reloadComponent();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    })
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'userName', header: 'User Name' },
      { field: 'email', header: 'Email' },
      { field: 'password', header: 'Password' },
      { field: 'phoneNumber', header: 'Phone Number' },
    ];

    // this.reloadComponent();
    // this.resetView();
    
  }

  resetView(){
    this.userService.getAllUsers().subscribe(
      data =>{
        this.users = data;
      }
    );
  }

  initialiseInvites() {
    this.getAllUsers();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getAllUsers(): any{
    this.userService.getAllUsers().subscribe(
      (data:User[])=>{
        this.users = data;
        this.chartData = new Array<TreeNode>();
        this.fillLeaf(this.chartData, -1,this.users);
      }
    );
  }

    showDialog() {
        this.router.navigate(['add'],{relativeTo:this.route});
    }

    editUser(id: number){
      this.router.navigate(['edit',id],{relativeTo: this.route});
    }

    deleteUser(id: number){
      this.userService.deleteUser(id);
      this.resetView();
      // this.router.navigate(['../users']);
    }

    confirm(id: number) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete this User?',
        accept: () => {
          this.deleteUser(id);
          this.resetView();
        }
      })
    }

    fillLeaf(TreeData: Array<TreeNode>, parentId: number, data: User[]){
      data.forEach(
        row => {
          let rowParent = row [this.parentField];
          if(rowParent === null || rowParent < 1){
            rowParent = -1;
          }

          if(rowParent == parentId){
            let treenode: TreeNode = {};
            treenode.data = row;
            treenode.children = [];
            TreeData.push(treenode);
            let RowSeq = row[this.primeField];
            this.fillLeaf(treenode.children, RowSeq,data);
          }
          // else{
          //   let treenode: TreeNode = {};
          //   treenode.data = row;
          //   treenode.children = [];
          //   TreeData.push(treenode);
          // }
        }
      );
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

}
