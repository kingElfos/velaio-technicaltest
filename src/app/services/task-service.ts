import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, statusTask } from '../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  
  constructor() {}


  addTask(task: Task) {
    this.tasksSubject.next([...this.tasksSubject.getValue(), task]);
  }

  
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  
  markTaskAsCompleted(id: string) {
    const updatedTasks = this.tasksSubject.getValue().map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

 
  filterTasks(status: statusTask | null): Observable<Task[]> {
    if (!status) {
    
      return this.getTasks();
    }

  
    const filteredTasks = this.tasksSubject.getValue().filter(task => 
      status === 'completed' ? task.completed : !task.completed
    );
    return new BehaviorSubject<Task[]>(filteredTasks).asObservable();
  }
}
