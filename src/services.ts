import { Todos as TodosKls } from './todos';
import { Files as FilesKls } from './files';
import { mkRpc } from './rpc'

export const services = {
  'todos': TodosKls,
  'files': FilesKls
}

interface AllServices {
  'todos': TodosKls;
  'files': FilesKls;
}

class ServiceProvider {
  get(s: keyof AllServices) {
    return services[s];
  }
}

const api = mkRpc(services);

console.log(api('todos.list', {}))
api('todos.add', { id: '1', text: 'blah', done: false })
console.log(api('todos.list', {}))