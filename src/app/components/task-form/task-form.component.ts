import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { atLeastOneSkill, noDuplicateNames } from '../../helpers/validators/validators-taskForm';
import {TaskFormActions} from '../../helpers/components/taskform/taskFormActions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  taskForm: FormGroup;
  taskActions: TaskFormActions;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      id: [crypto.randomUUID()],
      name: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      people: this.fb.array([], Validators.required)
    });

    this.taskActions = new TaskFormActions(this.fb, this.cdr, this.taskService, this.taskForm);
  }

  

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }




}
