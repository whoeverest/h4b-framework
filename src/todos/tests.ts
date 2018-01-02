import { Todos } from '../todos';

const tests = [
  function() {
    const t = new Todos();
    t.add({ id: '1', text: 'buy milk', done: false })
    t.add({ id: '2', text: 'buy a car', done: false })
    if (t.list().length !== 2) {
      throw new Error('test 1 failed')
    }
  }
]

tests.forEach(t => t())