import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { TaskService } from '../../../services/task-service';
import { Task, statusTask } from '../../../models/task-model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-scroll-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollListComponent {

  @Input() tasks!: Task[];

  constructor(private taskService: TaskService) {}



  toggleTaskStatus(taskId: string) {
    this.taskService.markTaskAsCompleted(taskId);
  }
}
