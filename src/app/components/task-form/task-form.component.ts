import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,AbstractControl } from '@angular/forms';
import {TaskService} from '../../services/task-service';
import {atLeastOneSkill, noDuplicateNames} from '../../helpers/validators/validators-taskForm';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
   taskForm: FormGroup;

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef, private taskService:TaskService) {
    this.taskForm = this.fb.group({
      id:[crypto.randomUUID()],
      name: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      people: this.fb.array([], noDuplicateNames)
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const person = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([], atLeastOneSkill)
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

  

  onSubmit() {
  if (this.taskForm.valid) {
    const task = this.taskForm.value;
    
    // Llama al servicio para agregar la tarea
    this.taskService.addTask(task);

    // Reinicia el formulario manualmente
    this.taskForm.reset();
    
    // Limpia los controles dinámicos de 'people' y 'skills'
    const peopleArray = this.taskForm.get('people') as FormArray;
    while (peopleArray.length) {
      peopleArray.removeAt(0);
    }

    // Vuelve a configurar el formulario a su estado inicial si es necesario
    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();

    // Actualiza el estado del formulario
    this.taskForm.updateValueAndValidity();

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
