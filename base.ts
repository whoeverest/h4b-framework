export interface ServiceContext {
  user: { id: string };
  tx: Transaction;
  req: { ipAddr: string }
}

export class Transaction {
  commit() {
    console.log('commit');
  }

  rollback() {
    console.log('rollback')
  }
}

export abstract class BaseService {
  _tx: Transaction | null;
  _user: { id: string } | null;
  _req: { ipAddr: string } | null;
  migrations: string[];
  
  constructor(ctx?: ServiceContext) {
    this._tx = ctx && ctx.tx || null;
    this._user = ctx && ctx.user || null;
    this._req = ctx && ctx.req || null;
  }

  get tx() {
    if (this._tx) return this._tx
    else return new Transaction();
  }

  get user() {
    return this._user || null;
  }
}