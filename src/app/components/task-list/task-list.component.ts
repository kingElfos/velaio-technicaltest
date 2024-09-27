import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/task-model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  filterTasks(status: 'completed' | 'pending') {
    this.tasks = this.taskService.filterTasks(status);
  }
}
