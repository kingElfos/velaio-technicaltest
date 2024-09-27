import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray,AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone:true,
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports:[CommonModule,ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
   taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      skills: this.fb.array([], this.atLeastOneSkill) // Validación personalizada para que haya al menos una habilidad
    });
    this.people.push(person);
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  addSkill(personIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.push(this.fb.control('', Validators.required));
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
      return { 'duplicateNames': true }; // Error si hay nombres duplicados
    }
    return null; // Sin errores
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Formulario válido:', this.taskForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
