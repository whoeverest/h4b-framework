import { Todo } from './todos'

class DB {
  data: { ['todos']: Todo[] }
  
  constructor() {
    this.data = {
      todos: []
    };
  }
}

export const db = new DB();