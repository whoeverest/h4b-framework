import { BaseService, ServiceContext } from './base';
import { rpc, expose } from './rpc';
import { db } from './db';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

@rpc
export class Todos extends BaseService {
  constructor(ctx?: ServiceContext) {
    super(ctx);
    this.migrations = ['0001-init', '0002-new-stuff'];
    db.data['todos'] = [];
  }

  @expose
  list() {
    console.log('listing');
    return db.data['todos'];
  }

  @expose
  add(todo: Todo) {
    db.data['todos'].push(todo);
    console.log(JSON.stringify(db))
  }

  @expose
  remove(id: string) {
    let i: number = -1;
    db.data['todos'].forEach((todo, index) => {
      if (todo.id === id) {
        i = index;
      }
    })
    delete db.data['todos'][i];
  }
}
