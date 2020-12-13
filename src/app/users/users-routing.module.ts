import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  // {path:'users', component:UsersComponent,canActivate:[AuthGuard],children: [
  //   {path:'add', component:EditComponent},
  //   {path:'edit/:id', component:EditComponent}
  // ]},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]

})
export class UsersRoutingModule { }
