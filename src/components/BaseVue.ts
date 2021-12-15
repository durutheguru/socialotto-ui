import Vue from "vue";
import { Util, Constants, Security } from "@/components/util";
import { Component } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";

@Component
export default class BaseVue extends Vue {
  public util = Util;

  public quantity = Util.quantity;

  public isValidArray = Util.isValidArray;

  public isValidString = Util.isValidString;

  public extractError = Util.extractError;

  public dateMoment = Util.dateMoment;

  public zoneDateTimeMoment = Util.zoneDateTimeMoment;

  public zdtToDTFormat(time: string): string {
    return Util.formatTime(
      time,
      Constants.defaultZoneDateTimeFormat,
      Constants.defaultDateFormat
    );
  }

  public zdtToDateTimeFormat(time: string): string {
    return Util.formatTime(
      time,
      Constants.defaultZoneDateTimeFormat,
      Constants.defaultDateTimeFormat
    );
  }

  public zdtToFullDateFormat(time: string): string {
    return Util.formatTime(
      time,
      Constants.defaultZoneDateTimeFormat,
      "D MMMM, YYYY"
    );
  }

  public zdtToTZFormat(time: string): string {
    return Util.formatTime(
      time,
      Constants.defaultZoneDateTimeFormat,
      "hh:mma z"
    );
  }

  public miniZoneDateTimeMoment(time: string) {
    let moment = this.zoneDateTimeMoment(time);
    return moment.substring(0, moment.indexOf(" ") + 2);
  }

  public fullDateFormat(time: string): string {
    return Util.formatTime(time, "YYYY-MM-DD", "D MMMM, YYYY");
  }

  public get isBackOfficeUser(): boolean {
    return Security.hasAuthorization(Constants.AUTHORITIES.BACK_OFFICE_USER);
  }

  public get isPlatformUser(): boolean {
    return Security.hasAuthorization(Constants.AUTHORITIES.PLATFORM_USER);
  }
}
