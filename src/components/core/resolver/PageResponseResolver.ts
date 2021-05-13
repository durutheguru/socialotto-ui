


export default interface PageResponseResolver {


    resolve(model: any, response: any, getters: any): void;


    append(model: any, response: any, getters: any): void;


    prepend(model: any, response: any, getters: any): void;


}

