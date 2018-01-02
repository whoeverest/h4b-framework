import { BaseService, ServiceContext } from '../base';
import { rpc, expose } from '../rpc';
import { db } from '../db';
import { services } from '../services';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

@rpc
export class Todos extends BaseService {
  migrations = ['0001-init', '0002-new-stuff'];

  constructor(ctx?: ServiceContext) {
    super(ctx);
    console.log(this.ctx)
    db['todos'] = db['todos'] || []
  }

  @expose
  list() {
    return db['todos'];
  }

  @expose
  add(todo: Todo) {
    db['todos'].push(todo);
    const Files = services.files;
    new Files(this.ctx).add({ data: 'random data' })
    new Files(this.ctx).add({ data: 'random data' })
    new Files().add({ data: 'kurov' })
    this.tx.commit();
  }

  @expose
  remove(id: string) {
    let i: number = -1;
    db['todos'].forEach((todo, index) => {
      if (todo.id === id) {
        i = index;
      }
    })
    delete db['todos'][i];
  }
}
