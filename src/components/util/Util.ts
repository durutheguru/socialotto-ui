
export default class Util {


    private static throttleObject: any = {};


    public static throttle(t: any) {
        if (Util.throttleObject[t.key]) {
            Util.throttleObject[t.key].exec = false;
        }

        Util.throttleObject[t.key] = t;
        t.exec = true;

        setTimeout(() => {
            if (t.exec) {
                if (Util.isValidFunction(t.func)) {
                    t.func();
                } else if (Util.isValidFunction(t.run)) {
                    t.run();
                }
            }
        }, t.time || 1000);
    }


    public static isValidString(str: string, empty: boolean = false) {
        return (typeof str === 'string') && ((!empty) ? (!!str && !!str.length) : true);
    }


    public static isValidNumber(num: any) {
        return typeof num === 'number';
    }


    public static isValidObject(obj: any) {
        return obj != null && typeof obj === 'object';
    }


    public static isValidArray(arr: any, empty: boolean) {
        return ((!empty) ? arr && !!arr.length : true);
    }


    public static isValidFunction(f: any) {
        return typeof f === 'function';
    }


    public static isUndefined(obj: any) {
        return typeof obj === 'undefined';
    }


    public static managedString(str: string, maxlength: number) {
        if (typeof str !== 'string') {
            return str;
        }

        if (str.length <= maxlength) {
            return str;
        } else {
            return str.substring(0, maxlength) + '...';
        }
    }


    public static deepGet(parent: any, path: string) {
        const paths = path.split('.');

        for (let k = 0, kLen = paths.length; k < kLen; k++) {
            if (parent != null && Object.prototype.hasOwnProperty.call(parent, paths[k])) {
                parent = parent[paths[k]];
            } else {
                return null;
            }
        }

        return parent;
    }


    public static errorSanitize(msg: string) {
        if (msg.indexOf('java.') > -1) {
            return 'Unknown Error';
        }

        return msg;
    }


    public static extractError(errorResponse: any) {
        const errorMsg = Util.deepGet(errorResponse, 'response.data.message');
        return Util.isValidString(errorMsg, false) ? Util.errorSanitize(errorMsg) : 'Unknown Error';
    }


    public static quantity(num: number, item: string, fullString?: boolean) {
        if (num < 0) {
            return item;
        }

        return (fullString ? (num > 0 ? num : 'No') + ' ' : '') + item + ((num <= 1) ? '' : 's');
    }


    public static merge(src: any, dest: any) {
        if (typeof src !== 'object') {
            throw new Error('Source must be Javascript objects');
        }

        if (typeof dest !== 'object') {
            dest = {};
        }

        for (const i in src) {
            if (src.hasOwnProperty(i)) {
                dest[i] = src[i];
            }
        }

        return dest;
    }

    public static uuid(): string {
        return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(
                /1|0/g, 

                () => { 
                    return (0 | Math.random() * 16).toString(16) ;
                }
            );
    }


    public static refresh(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }


}
