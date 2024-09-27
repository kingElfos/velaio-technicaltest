import { Injectable } from '@angular/core';
import { Task } from '../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  constructor() {}

  addTask(task: Task) {
    this.tasks.push(task);
  }

  getTasks() {
    return this.tasks;
  }

  markTaskAsCompleted(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
    }
  }

  filterTasks(status: 'completed' | 'pending') {
    return this.tasks.filter(task => status === 'completed' ? task.completed : !task.completed);
  }
}
