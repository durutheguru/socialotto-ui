import { Log } from "@/components/util";
import PageResponseResolver from "./PageResponseResolver";


export default class DefaultPageResponseResolver implements PageResponseResolver {


    public resolve(model: any, response: any, getters: any): void {
        Log.info(`PageModel: ${JSON.stringify(model)}`);
        Log.info(`PageResponse: ${JSON.stringify(response)}`);

        model.pageData = {
            next: {},
            previous: {},
            number: response.data.number,
            size: response.data.size,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
        };
    }


    public append(model: any, response: any, getters: any): void {
        Array.prototype.push.apply(model.list, response.data.content);
        this.distinctList(model);
        this.resolve(model, response, getters);
    }


    public prepend(model: any, response: any, getters: any): void {
        Array.prototype.push.apply(response.data.content, model.list);
        model.list = response.data.content;
        this.distinctList(model);
        this.resolve(model, response, getters);
    }


    private distinctList(model: any) {
        let filterKeys: any = {};
        model.list = model.list.filter((item: {id: number}) => {
            if (!!filterKeys[item.id]) {
                return false;
            }

            filterKeys[item.id] = item.id;
            return true;
        });
    }


}


