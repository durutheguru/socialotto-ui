import { LocalDate, LocalDateTime, LocalTime, ZonedDateTime, ZoneId } from "@js-joda/core";
import { ApolloError } from "apollo-client";
import moment from "moment";
import { Constants } from ".";
import store from "../../store/index";
import { v4 as uuidv4 } from 'uuid';
import { v5 as uuidv5 } from 'uuid';


export default class Util {


    private static throttleObject: any = {};

    public static pickFileType(fileRefs: any, filetypes:any) {
        let array = [];
        for (let i = 0; i < fileRefs.length; i++) {
          if (filetypes.includes(fileRefs[i].fileType)) {
            array.push(fileRefs[i]);
          }
        }
  
        return array;
      }

    public static removeLastChar(string: string, char: string){

        let newTime = string.slice(0, string.lastIndexOf(char)) + string.slice(string.lastIndexOf(char) + 1, string.length) 
            return newTime
        }

    public static clickOutside(menu: string, menuTrigger: string, storeMutation: string) {
        let elem = document.getElementById(menu) as HTMLElement;
        let rect = elem.getBoundingClientRect();
        let rectx = Math.floor(rect.x);
        let recty = Math.floor(rect.y);
        let recth = Math.floor(rect.height);
        let rectw = Math.floor(rect.width);
        let rectxspan = rectx + rectw;
        let rectyspan = recty + recth;
    
        window.onclick = (event: any) => {
          let x = event.clientX;
          let y = event.clientY;
        //   let arr = ["recentsToggle", "noticeToggle", "dropdown"]
        //   arr.includes(event.target.id) 
    
          // if(self.menu)
         
    
          if (
            event.target.id !== menuTrigger && 
            (x < rectx || x > rectxspan || y < recty || y > rectyspan)
          ) {
            store.commit(storeMutation, false);
          }
        };
    }
    
    public static handleGlobalAlert(show: boolean, type: string, text: string) {
        store.commit("setGlobalAlert", { show, type, text });
    }


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


    public static isValidPositiveNumber(num: any) {
        return typeof num === 'number' && num > 0;
    }


    public static isValidObject(obj: any) {
        return obj != null && typeof obj === 'object';
    }


    public static isValidArray(arr: any, empty?: boolean) {
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

    public static searchImageUrl(arr: any[]) {
        const defaultBackground: string = Constants.defaultCardBackgroundUrl;
        
        const obj: any = arr.find(({ fileType }) => { 
            return fileType.slice(0, 5) === 'image';
        });
         

        return arr.length && obj && obj.publicUrl ? obj.publicUrl : defaultBackground;
    }

    // public static getPublicUrl(obj: any) {
        
        
         

    //     return obj && obj.publicUrl 
    // }


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


    public static extractGqlError(error: ApolloError): string {
        const msg = error.message;
        return Util.isValidString(msg) && msg.indexOf(Constants.gqlDefaultErrorDelimeter) > 0 ? 
            msg.substring(msg.indexOf(Constants.gqlDefaultErrorDelimeter) + Constants.gqlDefaultErrorDelimeter.length) 
            : msg;
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


    public static copy(src: any, dest: any) {
        if (typeof src !== "object") {
            throw new Error("Source must be Javascript objects");
        }

        if (typeof dest !== "object") {
            dest = {};
        }

        for (let i in src) {
            if (src.hasOwnProperty(i)) {
                dest[i] = src[i];
            }
        }

        return dest;
    }


    public static copyArray(src: any, dest: any) {
        if (!Util.isValidArray(src, true) || !Util.isValidArray(dest, true)) {
            throw new Error("Both source and Destination must be valid Javascript arrays");
        }

        for (let i = 0, l = src.length; i < l; i++) {
            dest.push(src[i]);
        }

        return dest;
    }


    public static clone(obj: any) {
        return $.extend(true, {}, obj);
    }


    public static refresh(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }


    public static formatTime(time: string, inputFormat: string, outputFormat: string): string {
        return moment(time, inputFormat).format(outputFormat);
    }


    public static moment(time: string, format: string): string {
        return moment(time, format).fromNow();
    }


    public static dateMoment(date: string, format?: string): string {
        return Util.moment(date, !!format ? format : Constants.defaultDateFormat);
    }


    public static dateTimeMoment(dateTime: string, format?: string): string {
        return Util.moment(dateTime, !!format ? format : Constants.defaultDateTimeFormat);
    }


    public static zoneDateTimeMoment(zoneDateTime: string, format?: string): string {
        return Util.moment(zoneDateTime, !!format ? format : Constants.defaultZoneDateTimeFormat);
    }


    public static currencyFormat(num: number, currency?: string) {
        return new Intl.NumberFormat(
            'en-US', 
            {
                style: 'currency', 
                currency: !!currency ? currency : Constants.defaultCurrency,
            },
        ).format(num);
    }


    public static stringifyZonedDateTime(
        date: string, time: string
    ): string {
        let formattedTime = ZonedDateTime.of(
            LocalDateTime.of(
                LocalDate.parse(date),
                LocalTime.parse(time),
            ),

            ZoneId.systemDefault(),
        )
        .withFixedOffsetZone()
        .toString();

        formattedTime = formattedTime.replace('T', ' ');

        if (formattedTime.length <= 16) {
            return formattedTime;
        }

        let zoneOffset = formattedTime.substring(16);
        zoneOffset = zoneOffset.replace(':', '');

        return `${formattedTime.substring(0, 16)} ${zoneOffset}`;
    }


    public static uuidv5(input?: string, pad?: boolean): string {
        return uuidv5(input || '', Util.uuid()) + (pad ? Util.uuid() : '');
    }


}

