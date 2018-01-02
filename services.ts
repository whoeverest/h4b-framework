import { Todos } from './todos';
import { mkRpc } from './rpc'

export const services = {
  'todos': Todos
}

const api = mkRpc(services);

console.log(api('todos.list', {}))
api('todos.add', { id: '1', text: 'blah', done: false })
console.log(api('todos.list', {}))