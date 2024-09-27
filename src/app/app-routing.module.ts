import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

const routes: Routes = [
  { path: 'list', loadComponent: () => import('./components/task-list/task-list.component').then(m => m.TaskListComponent) },
  { path: 'create', loadComponent: () => import('./components/task-form/task-form.component').then(m => m.TaskFormComponent) },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
