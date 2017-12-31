import { expose, rpc } from './rpc';

interface Todo {
    id: string;
    text: string;
    done: boolean;
}

@rpc
class Todos {
    db: Todo[] = []

    @expose
    list() {
        return this.db;
    }

    @expose
    add(todo: Todo) {
        this.db.push(todo);
    }

    @expose
    remove(id: string) {
        let i: number = -1;
        this.db.forEach((todo, index) => {
            if (todo.id === id) {
                i = index;
            }
        })
        delete this.db[i];
    }
}

class ServiceProvider {
    all: { [key: string]: any };

    constructor() {
        this.all = {}
    }

    register(name: string, provider: any) {
        this.all[name] = provider;
    }
}

const providers = new ServiceProvider()
const todos = new Todos()
todos.add({ id: '1', text: 'buy milk', done: false })
todos.add({ id: '2', text: 'buy a car', done: true })
providers.register('todos', todos);

function callMethod(route: string, params: any) {
    const [namespace, method] = route.split('.');
    console.log(providers.all[namespace].__callRpc(method, params))
}

callMethod('todos.list', {})
callMethod('todos.add', { id: '3', text: 'whateva', done: false })
callMethod('todos.list', {})