import { Log, Util } from "@/components/util";
import PageResponseResolver from "./PageResponseResolver";



export default class PullStreamDataResponseResolver implements PageResponseResolver {


    public resolve(model: any, response: any, getters: any): void {
        Log.info(`PullStreamModel: ${JSON.stringify(model)}`);
        Log.info(`PullStreamResponse: ${JSON.stringify(response)}`);

        let existingMinTimeStamp = getters.getMinFetchedTimeStamp;
        let existingMaxTimeStamp = getters.getMaxFetchedTimeStamp;

        model.pageData = {
            next: {},
            previous: {},
            number: response.data.number,
            size: response.data.size,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
            minTimeStamp: this.resolveMinTimeStamp(
                existingMinTimeStamp, response.data.minTimeStamp
            ),
            maxTimeStamp: this.resolveMaxTimeStamp(
                existingMaxTimeStamp, response.data.maxTimeStamp
            ),
        };
    }


    private resolveMinTimeStamp(existingMinTimeStamp: number, responseMinTimeStamp: number) {
        if (!Util.isValidNumber(responseMinTimeStamp)) {
            return existingMinTimeStamp;
        }

        if (Util.isValidNumber(existingMinTimeStamp)) {
            if (existingMinTimeStamp < responseMinTimeStamp && existingMinTimeStamp !== 0) {
                return existingMinTimeStamp;
            } else {
                return responseMinTimeStamp;
            }
        }
    }


    private resolveMaxTimeStamp(existingMaxTimeStamp: number, responseMaxTimeStamp: number) {
        if (!Util.isValidNumber(responseMaxTimeStamp)) {
            return existingMaxTimeStamp;
        }

        if (Util.isValidNumber(existingMaxTimeStamp)) {
            if (existingMaxTimeStamp < responseMaxTimeStamp) {
                return responseMaxTimeStamp;
            } else {
                return existingMaxTimeStamp;
            }
        }
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


