import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component'
import {TaskService} from './services/task-service';
import {FakeTasksService} from './services/fake-tasks.service';
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
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers:[TaskService,FakeTasksService]
})
export class AppModule { }
