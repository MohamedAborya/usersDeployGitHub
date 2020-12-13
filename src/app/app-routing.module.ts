import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
// import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './users/users.component';
// import { EditComponent } from './users/edit/edit.component';
// import { EditingComponent } from './profile/edit/edit.component';


const routes: Routes = [
  // {path:'', redirectTo:'/login',pathMatch:'full'},
  // {path:'home', component:HomeComponent,canActivate:[AuthGuard],runGuardsAndResolvers: 'always'},
  // {path:'profile', component:ProfileComponent,canActivate:[AuthGuard],runGuardsAndResolvers: 'always',children:[
  //   {path:'edit', component: EditingComponent}
  // ]},
  // {path:'users', component:UsersComponent,canActivate:[AuthGuard],runGuardsAndResolvers: 'always',children: [
  //   {path:'add', component:EditComponent},
  //   {path:'edit/:id', component:EditComponent}
  // ]},
  // {path:'signup', component:SignupComponent},
  // {path:'login', component:LoginComponent},
  // {path:'**', redirectTo:'/login'}
  {path:'', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'profile', component:ProfileComponent},
  {path:'users', component:UsersComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'**', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
