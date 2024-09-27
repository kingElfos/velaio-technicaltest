import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task-model';

@Component({
  standalone:true,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports:[CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
