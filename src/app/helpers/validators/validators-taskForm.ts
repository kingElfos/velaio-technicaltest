import { FormArray,AbstractControl } from '@angular/forms';

type ValidationCustom={ [key: string]: boolean } | null

// Validation skills length> o
export const atLeastOneSkill=(control: AbstractControl):ValidationCustom=> {
    const skillsArray = control as FormArray;
    if (skillsArray.length === 0) {
      return { 'atLeastOneSkill': true }; 
    }
    return null; 
}


  // validation names duplicated
export const noDuplicateNames=(control: AbstractControl):ValidationCustom=> {
    const peopleArray = control as FormArray;
    const names = peopleArray.controls.map(person => person.get('name')?.value);
    const duplicates = names.filter((name:string, index:number) => names.indexOf(name) !== index);
    if (duplicates.length > 0) {
      return { 'duplicateNames': true }; 
    }
    return null; 
}

