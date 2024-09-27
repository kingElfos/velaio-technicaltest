import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, statusTask } from '../models/task-model';
import {FakeTasksService} from '../services/fake-tasks.service'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject: BehaviorSubject < Task[] > = new BehaviorSubject < Task[] > ([]);

  constructor(private fakeTasksService:FakeTasksService) {
    this.fakeTasksService.getTasksWithRandomPeople().subscribe((tasks)=>this.tasksSubject.next(tasks.slice(0,11)))
  }
  addTask(task: Task) {
    this.tasksSubject.next([...this.tasksSubject.getValue(), task]);
  }


  getTasks(): Observable < Task[] > {
    return this.tasksSubject.asObservable();
  }


  markTaskAsCompleted(id: string) {
    const updatedTasks = this.tasksSubject.getValue().map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }


  filterTasks(status: statusTask | 'all'): Observable < Task[] > {
    if (status === 'all') {
      return this.getTasks();
    }
    const filteredTasks = this.tasksSubject.getValue().filter(task =>
      status === 'completed' ? task.completed : !task.completed
    );
    return new BehaviorSubject < Task[] > (filteredTasks).asObservable();
  }
}
