
export interface Task {
  id: number;
  name: string;
  dueDate: Date;
  people: Person[];
  completed: boolean;
}

export interface Person {
  name: string;
  age: number;
  skills: string[];
}
