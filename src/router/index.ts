import Vue from "vue";
import VueRouter from "vue-router";
import NavHeader from "../views/unprotected/NavHeader.vue";
import AuthNavHeader from "../protected/AuthNavHeader.vue";
import LandingPage from "../vues/landingPage/LandingPage.vue";
import ExpenseRequests from "../vues/backoffice/vues/expense/expenseRequests.vue";
import ReviewLotteryExpense from "../vues/backoffice/vues/expense/ReviewLotteryExpense.vue";
import Login from "../vues/login/Login.vue";
// import Signup from '../vues/signup/'
import ManageUsers from "../vues/backoffice/vues/users/UsersList.vue";
import UserDetails from "../vues/backoffice/vues/users/UserDetails.vue";
import UserAuthorities from "../vues/backoffice/vues/users/UserAuthorities.vue";
import UserSettlement from "../vues/backoffice/vues/users/UserSettlement.vue";
import Users from "@/vues/backoffice/vues/users/Users.vue";
import BackOffice from "../vues/backoffice/BackOffice.vue";

import Lottery from "@/vues/lottery/Lottery.vue";
import Campaign from "@/vues/campaign/Campaign.vue";
import CreateLottery from "@/vues/backoffice/vues/lottery/CreateLottery.vue";
import RaiseLotteryExpense from "@/vues/backoffice/vues/lottery/RaiseLotteryExpense.vue";
import LotteriesView from "@/vues/backoffice/vues/lottery/LotteriesView.vue";
import CampaignsView from "@/vues/backoffice/vues/campaign/CampaignsView.vue";
import guard from "./util/guard";
import afterRouteScriptLoader from "./util/afterRouteScriptLoader";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",

    name: "NavHeader",
    component: NavHeader,
    children: [
      {
        path: "/",
        name: "LandingPage",
        meta: {
          skipAuth: true,
        },
        component: LandingPage,
      },
      {
        path: "/signup",
        name: "Signup",
        component: () => import("@/vues/signup/Signup.vue"),
        meta: {
          skipAuth: true,
        },
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
          skipAuth: true,
        },
      },
      {
        path: "/forgotpassword",
        name: "Forgot Password",
        component: () => import("@/vues/forgotPassword/ForgotPassword.vue"),
        meta: {
          skipAuth: true,
        },
      },
      {
        path: "/password_reset",
        name: "ResetPassword",
        component: () => import("@/vues/forgotPassword/ResetPassword.vue"),
        meta: {
          skipAuth: true,
        },
      },
      {
        path: "/user_activation",
        name: "UserActivation",
        component: () => import("@/vues/user_activation/UserActivation.vue"),
        meta: {
          skipAuth: true,
        },
      },
      {
        path: "/home",
        name: "Home",
        component: () => import("@/vues/home/Home.vue"),
        meta: {
          skipAuth: true,
        },
      },

      {
        path: "/create_campaign",
        name: "CreateCampaign",
        component: () =>
          import("@/vues/campaign/vues/create/CreateCampaign.vue"),
      },
      
      {
        path: "/user",
        redirect: "/user/profile",
        name: "User",
        component: () => import("@/vues/users/User.vue"),
        children: [
          {
            path: "profile",
            name: "Profile",
            component: () => import("@/vues/users/Profile.vue"),
          },
          {
            path: "wallet",
            name: "Wallet",
            component: () => import("@/vues/users/Wallet.vue"),
            children: [
              {
                path: "update",
                name: "WalletUpdateApproval",
                component: () =>
                  import("@/vues/users/WalletUpdateApproval.vue"),
              },

              {
                path: "update/:updateId",
                name: "WalletUpdateApproval",
                component: () =>
                  import("@/vues/users/WalletUpdateApproval.vue"),
              },
            ],
          },
        ],
      },

      {
        path: "/campaign/:id",
        name: "CampaignDetails",
        component: () =>
          import("@/vues/campaign/vues/campaignDetails/CampaignDetails.vue"),
        meta: {
          skipAuth: true,
        },
      },

      {
        path: "/lottery/:id",
        name: "LotteryDetails",
        component: () =>
          import("@/vues/lottery/vues/details/LotteryDetails.vue"),
      },
    ],
  },
  // {
  //   path: "/auth_home",
  //   name: "AuthNavHeader",
  //   component: AuthNavHeader,
  //   meta: {
  //     skipAuth: true,
  //   },

  //   children: [

  //   ],
  // },

  {
    path: "/back-office",
    name: "BackOffice",
    component: BackOffice,
    children: [
      {
        path: "/back-office/create-lottery",
        name: "CreateLottery",
        component: CreateLottery,
      },
      {
        path: "/back-office/lotteries",
        name: "LotteriesView",
        component: LotteriesView,
      },
      {
        path: "/back-office/campaigns",
        name: "CampaignssView",
        component: CampaignsView,
      },
      {
        path: "/back-office/raise_lottery_expense/:id",
        name: "RaiseLotteryExpense",
        component: RaiseLotteryExpense,
      },
      {
        path: "/back-office/expense_requests",
        name: "ExpenseRequests",
        component: ExpenseRequests,
      },
      {
        path: "/back-office/review_lottery_expense/:id",
        name: "ReviewLotteryExpense",
        component: ReviewLotteryExpense,
      },
      {
        path: "/back-office/users",
        name: "Manage Users",
        component: ManageUsers,
      },
      {
        path: "/back-office/users/:userDetails",
        // redirect: "/back-office/users/authorities/:userDetails",
        name: "UserDetails",
        component: UserDetails,
        // children: [
        //   {
        //     path: "/back-office/users/authorities/:userDetails",
        //     name: "User Authorities",
        //     component: UserAuthorities,
        //   },
        //   {
        //     path: "/back-office/users/settlement/:userDetails",
        //     name: "User Settlement",
        //     component: UserSettlement,
        //   },
        // ],
      },

      // {
      //   path: 'users',
      //   name: 'Users',
      //   component: Users,
      //   children: [
      //     {
      //       path: 'back-office',
      //       component: () => import('@/vues/backoffice/vues/users/backoffice-users/BackOfficeUsers.vue'),
      //     },

      //     {
      //       path: 'partner',
      //       component: () => import('@/vues/backoffice/vues/users/partner-users/PartnerUsers.vue'),
      //     },

      //     {
      //       path: 'lottery',
      //       component: () => import('@/vues/backoffice/vues/users/lottery-users/LotteryUsers.vue')
      //     },
      //   ],
      // },

      // {
      //   path: 'partner',
      //   name: 'Partners',
      //   component: () => import('@/vues/backoffice/vues/partner/Partner.vue'),
      // },

      // {
      //   path: 'campaign',
      //   name: 'Campaigns',
      //   component: () => import('@/vues/backoffice/vues/campaign/Campaign.vue'),
      // },

      // {
      //   name: 'Campaign Approval',
      //   path: 'campaign/awaiting_approval',
      //   component: () => import('@/vues/backoffice/vues/campaign/modules/approvals/CampaignApproval.vue'),
      // }
    ],
  },
  // {
  //   path: "/back-office-page",
  //   redirect: "/back-office",
  //   name: "BackOfficeHeader",
  //   component: () => {
  //     return import("@/vues/backoffice/vues/lottery/BackOfficeHeader.vue");
  //   },
  //   children: [
  //     {
  //       path: "/viewLottery",
  //       name: "ViewLotteryDetails",
  //       components: () => {
  //         return import(
  //           "@/vues/backoffice/vues/lottery/ViewLotteryDetails.vue"
  //         );
  //       },
  //     },

  //     {
  //       path: "/back-office-page/viewlottery/:id",
  //       name: "LotteryDetails",
  //       component: () =>
  //         import("@/vues/lottery/vues/details/LotteryDetails.vue"),
  //     },
  //   ],
  // },

  {
    path: "/payment_integration",
    name: "PaymentIntegration",
    component: () =>
      import("@/vues/payment_integration/PaymentIntegration.vue"),
    meta: {
      skipAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach(guard);
router.afterEach(afterRouteScriptLoader);

export default router;
