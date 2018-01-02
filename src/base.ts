export interface ServiceContext {
  user: { id: string } | null;
  tx: Transaction | null;
  req: { ipAddr: string } | null
}

let txId = 0;

export class Transaction {
  id: number;

  constructor() {
    this.id = txId++;
  }

  exec() {
    console.log(`executing in ${this.id}`);
  }

  commit() {
    console.log(`committing in tx ${this.id}`);
  }

  rollback() {
    console.log(`rolling back ${this.id}`)
  }
}

export abstract class BaseService {
  _ctx: {
    tx: Transaction | null;
    user: { id: string } | null;
    req: { ipAddr: string } | null;
  }
  migrations: string[];
  
  constructor(ctx: ServiceContext = { tx: null, user: null, req: null }) {
    if (ctx) {
      this._ctx = ctx;
    }
    this._ctx.tx = ctx.tx || null;
    this._ctx.user = ctx.user || null;
    this._ctx.req = ctx.req || null;
  }

  get ctx() {
    return this._ctx;
  }

  get tx() {
    if (!this._ctx.tx) this._ctx.tx = new Transaction();
    return this._ctx.tx;
  }

  get user() {
    return this._ctx.user;
  }
}