import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';



import { UsersComponent } from './users.component';
import { EditComponent } from './edit/edit.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {TreeTableModule} from 'primeng/treetable';

@NgModule({
  declarations: [
    UsersComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    UsersRoutingModule,
    FormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    TreeTableModule
  ],
  exports: [
    UsersRoutingModule
  ],providers:[
    ConfirmationService
  ]
})
export class UsersModule { }
