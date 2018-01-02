import { BaseService, ServiceContext } from './base'
import { db } from './db';

export interface File {
  id: string;
  data: string;
}

let _lastId: number = 0;

export class Files extends BaseService {
  constructor(ctx?: ServiceContext) {
    super(ctx)
    db.files = db.files || {};
  }
  
  add(file: { data: string }) {
    const id = String(_lastId + 1)
    db.files[id] = { id, data: file.data }
    _lastId++
    this.tx.exec()
  }

  remove(params: { id: string }) {
    delete db.files[params.id];
  }
}