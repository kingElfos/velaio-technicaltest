import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray,AbstractControl } from '@angular/forms';
import {TaskService} from '../../services/task-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  standalone:true,
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports:[CommonModule,ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[TaskService]
})
export class TaskFormComponent {
   taskForm: FormGroup;

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef, private taskService:TaskService) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      people: this.fb.array([], this.noDuplicateNames)
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const person = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([], this.atLeastOneSkill)
    });
    this.people.push(person);
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  addSkill(personIndex: number) {
  const skills = this.getSkills(personIndex);

  Swal.fire({
    title: 'Añadir Habilidad',
    input: 'text',
    inputLabel: 'Nombre de la habilidad',
    inputPlaceholder: 'Escribe la habilidad',
    showCancelButton: true,
    confirmButtonText: 'Agregar',
    cancelButtonText: 'Cancelar',
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage('¡Por favor ingresa una habilidad!');
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      skills.push(this.fb.control(result.value, Validators.required));
      this.cdr.detectChanges();
    }
  });
}

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.removeAt(skillIndex);
  }

  // Validation skills length> o
  atLeastOneSkill(control: AbstractControl): { [key: string]: boolean } | null {
    const skillsArray = control as FormArray;
    if (skillsArray.length === 0) {
      return { 'atLeastOneSkill': true }; 
    }
    return null; 
  }

  // validation names duplicated
  noDuplicateNames(control: AbstractControl): { [key: string]: boolean } | null {
    const peopleArray = control as FormArray;
    const names = peopleArray.controls.map(person => person.get('name')?.value);
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicates.length > 0) {
      return { 'duplicateNames': true }; 
    }
    return null; 
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task=this.taskForm.value;
      this.taskService.addTask(task);
      Swal.fire({
          icon: 'success',
          title: 'Tarea Agregada',
          text: 'La tarea se ha agregado correctamente.',
        });
    } else {
       Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al agregar la tarea. Inténtalo de nuevo.',
        });
    }
  }
}
