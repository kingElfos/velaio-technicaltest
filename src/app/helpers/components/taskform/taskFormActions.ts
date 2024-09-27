import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { TaskService } from '../../../services/task-service';
import { atLeastOneSkill } from '../../validators/validators-taskForm';
import Swal from 'sweetalert2';


export class TaskFormActions {

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private taskService: TaskService,
    private taskForm: FormGroup
  ) {

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

  removePerson(index: number) {
    this.people.removeAt(index);
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

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.removeAt(skillIndex);
  }


  onSubmit() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;

      this.taskService.addTask(task);

      this.taskForm.reset();

      const peopleArray = this.taskForm.get('people') as FormArray;
      while (peopleArray.length) {
        peopleArray.removeAt(0);
      }


      this.taskForm.markAsPristine();
      this.taskForm.markAsUntouched();
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
