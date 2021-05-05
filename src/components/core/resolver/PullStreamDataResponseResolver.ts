import { Util } from "@/components/util";
import PageResponseResolver from "./PageResponseResolver";



export default class PullStreamDataResponseResolver implements PageResponseResolver {


    public resolve(model: any, response: any): void {
        let existingMinTimeStamp = model.pageData.minTimeStamp;
        let existingMaxTimeStamp = model.pageData.maxTimeStamp;

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
            if (existingMinTimeStamp < responseMinTimeStamp) {
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
                return existingMaxTimeStamp;
            } else {
                return responseMaxTimeStamp;
            }
        }
    }


    public append(model: any, response: any): void {
        Array.prototype.push.apply(model.list, response.data.content);
        this.resolve(model, response);
    }


    public prepend(model: any, response: any): void {
        Array.prototype.push.apply(response.data.content, model.list);
        model.list = response.data.content;
        this.resolve(model, response);
    }


}


