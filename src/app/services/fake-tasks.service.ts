import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task-model'; 
import { JsonPlaceHolderObject } from '../models/json-placeholder.model'; 
@Injectable({
  providedIn: 'root'
})
export class FakeTasksService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTasksWithRandomPeople(): Observable<Task[]> {
    return this.http.get<JsonPlaceHolderObject[]>(this.apiUrl).pipe(
      map(tasks => tasks.map(task => ({
        id: task.id.toString(),
        name: task.title,
        dueDate: this.randomDate(),
        people: [this.getRandomPerson()], 
        completed: task.completed
      })))
    );
  }

  
  private getRandomPerson() {
    const randomNames = ['John Doe', 'Jane Smith', 'Carlos Lopez', 'Ana González', 'Emily Brown'];
    const randomAges = [25, 30, 35, 40, 28];
    const randomSkills = ['JavaScript', 'Angular', 'React', 'Node.js', 'Python'];

    const randomIndex = Math.floor(Math.random() * randomNames.length);
    return {
      name: randomNames[randomIndex],
      age: randomAges[randomIndex],
      skills: [randomSkills[Math.floor(Math.random() * randomSkills.length)]],
    };
  }

  // Método para generar una fecha aleatoria entre hoy y los próximos 30 días
  private randomDate(): Date {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 30); // Número aleatorio de días entre 0 y 30
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() + randomDays);
    return randomDate;
  }

}
