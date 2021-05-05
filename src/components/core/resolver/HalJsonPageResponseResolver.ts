import PageResponseResolver from "./PageResponseResolver";



export default class HalJsonPageResponseResolver implements PageResponseResolver {

    
    public resolve(model: any, response: any) {
        model.pageData = response.data.page;
        model.pageData.next = response.data._links.next || {};
        model.pageData.previous = response.data._links.prev || {};
    }


    public append(model: any, response: any): void {
        Array.prototype.push.apply(model.list, response.data._embedded[model.entityKeyName]);
        this.resolve(model, response);
    }


    public prepend(model: any, response: any): void {
        Array.prototype.push.apply(response.data._embedded[model.entityKeyName], model.list);
        model.list = response.data._embedded[model.entityKeyName];
        this.resolve(model, response);
    }


    
}

