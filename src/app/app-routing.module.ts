import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
const routes: Routes = [
  { path: 'create-task', component: TaskFormComponent },
  { path: 'list-tasks', component: TaskListComponent },
  { path: '', redirectTo: '/create-task', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
