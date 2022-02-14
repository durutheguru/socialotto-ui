// import PageRequest from "@/components/core/PageRequest";
import { Web, Constants } from "@/components/util";
import { APISuccessCallback, APIErrorCallback } from "@/components/util/Web";

export default class UsersService {
  public static removeAuthority(
    details: any,
    successHandler: APISuccessCallback,
    errorHandler: APIErrorCallback
  ) {
    Web.post(
      Constants.API_BASE + "/user_auth_map/request/delete",
      details,
      successHandler,
      errorHandler
    );
  }

  public static addAuthority(
    details: any,
    successHandler: APISuccessCallback,
    errorHandler: APIErrorCallback
  ) {
    Web.post(
      Constants.API_BASE + "/user_auth_map/request",
      details,
      successHandler,
      errorHandler
    );
  }

  //   public static createLottery(
  //     lottery: any,
  //     successHandler: APISuccessCallback,
  //     errorHandler: APIErrorCallback
  //   ) {
  //     Web.post(
  //       Constants.API_BASE + "/lottery",
  //       lottery,
  //       successHandler,
  //       errorHandler
  //     );
  //   }

  //   public static getLotteries(
  //     pageRequest: PageRequest,
  //     successHandler: APISuccessCallback,
  //     errorHandler: APIErrorCallback
  //   ) {
  //     Web.get(
  //       "/api/v1/lottery?page=" + pageRequest.page + "&size=" + pageRequest.size,
  //       successHandler,
  //       errorHandler
  //     );
  //   }
}
