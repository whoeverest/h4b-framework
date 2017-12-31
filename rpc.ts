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
    klass.prototype['__callRpc'] = function(fnName: string, params: any) {
        if (!this[fnName] || !this[fnName].__exposed) {
            throw new Error('404');
        }
        return this[fnName](params);
    }
}