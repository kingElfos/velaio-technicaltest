import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      people: this.fb.array([]),
    });
  }

  get people() {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const person = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([''])
    });
    this.people.push(person);
  }

  addSkill(personIndex: number) {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.push(this.fb.control(''));
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.removeAt(skillIndex);
  }
}
