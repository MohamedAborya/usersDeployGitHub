import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditingComponent } from './edit/edit.component';
import { AuthGuard } from '../auth/auth.guard';

const appRoutes: Routes = [
  // {path:'profile', component:ProfileComponent, canActivate:[AuthGuard],children:[
  //   {path:'', redirectTo:'../',pathMatch:'full'},
  //   {path:'edit', component: EditingComponent}
  // ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class ProfileRoutingModule { }
