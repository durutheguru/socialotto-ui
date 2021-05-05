


export default interface PageResponseResolver {


    resolve(model: any, response: any): void;


    append(model: any, response: any): void;


    prepend(model: any, response: any): void;


}
