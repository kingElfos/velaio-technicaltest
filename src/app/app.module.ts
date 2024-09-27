import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component'
import {TaskService} from './services/task-service';
import { ReactiveFormsModule } from '@angular/forms';
import {TaskFormComponent} from './components/task-form/task-form.component';
import {TaskListComponent} from './components/task-list/task-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskFormComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers:[TaskService]
})
export class AppModule { }
