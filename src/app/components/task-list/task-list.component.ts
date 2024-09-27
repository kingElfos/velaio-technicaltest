import { Component, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task,statusTask} from '../../models/task-model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
tasks: Task[] = [];

  constructor(private taskService: TaskService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.cdr.detectChanges();
    });
  }

  filterTasks(event: any) {
    const status: statusTask | 'all' = event.target.value;
    this.taskService.filterTasks(status).subscribe(filteredTasks => {
      console.log(filteredTasks)
      this.tasks = filteredTasks;
    });
  }

  toggleTaskStatus(taskId: string) {
    this.taskService.markTaskAsCompleted(taskId);
  }
}
