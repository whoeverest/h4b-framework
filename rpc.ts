import { BaseService } from "./base";

/**
 * Declares that it's okay for a method to be exposed to the outside.
 */
export function expose(target: Object, name: string, descrtiptor: PropertyDescriptor) {
    descrtiptor.value['__exposed'] = true
}

/**
 * Adds a special function that can be used by an RPC mechanism to call
 * exposed methods on the class.
 */
export function rpc(klass: Function) {
    klass.prototype.__callRpc = function(fnName: string, params: {}) {
        if (!this[fnName] || !this[fnName].__exposed) {
            throw new Error('404');
        }
        return this[fnName](params);
    }
}

/**
 * Given a list of services, it returns a function that
 * allows accessing the exposed service methods.
 */
export function mkRpc(services: any) {
    return (route: string, params: {}) => {
        const [serviceName, method] = route.split('.');
        const Kls = (services)[serviceName];
        console.log('calling', serviceName, method, 'with params', params)
        return (new Kls()).__callRpc(method, params)
    };
}
