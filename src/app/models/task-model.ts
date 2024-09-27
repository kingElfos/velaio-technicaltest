
export interface Task {
  id: string;
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

export type statusTask= 'completed' | 'pending'
