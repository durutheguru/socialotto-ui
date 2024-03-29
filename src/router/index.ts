import Vue from 'vue';
import VueRouter from 'vue-router';
import NavHeader from "../views/unprotected/NavHeader.vue";
import AuthNavHeader from "../protected/AuthNavHeader.vue";
import LandingPage from "../vues/landingPage/LandingPage.vue"

import Login from '../vues/login/Login.vue';
// import Signup from '../vues/signup/'


import Users from '@/vues/backoffice/vues/users/Users.vue';
import BackOffice from '../vues/backoffice/BackOffice.vue';

import Lottery from '@/vues/lottery/Lottery.vue';
import Campaign from '@/vues/campaign/Campaign.vue';

import guard from './util/guard';
import afterRouteScriptLoader from './util/afterRouteScriptLoader';


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    name: "NavHeader",
    component: NavHeader,
    children: [
      {
        path: "/",
        name: "LandingPage",
        component: LandingPage

      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/vues/signup/Signup.vue'),
        meta: {
          skipAuth: true,
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          skipAuth: true,
        },
      },
      {
        path: "/forgotpassword",
        name: "Forgot Password",
        component: () => import('@/vues/forgotPassword/ForgotPassword.vue'),
        meta: {
          skipAuth: true,
        },
      },
      {
        path: '/password_reset',
        name: 'ResetPassword',
        component: () => import('@/vues/forgotPassword/ResetPassword.vue'),
        meta: {
          skipAuth: true,
        },
      },





  {
    path: '/user_activation',
    name: 'UserActivation',
    component: () => import('@/vues/user_activation/UserActivation.vue'),
    meta: {
      skipAuth: true,
    },
  }
   
    ]
  },
  {
    path: '/auth_home',
    name: "AuthNavHeader",
    component: AuthNavHeader,
    meta: {
      skipAuth: true,
    },
   
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/vues/home/Home.vue"),
       
      },

      {
        path: '/create_campaign',
        name: 'CreateCampaign',
        component: () => import('@/vues/campaign/vues/create/CreateCampaign.vue'),
       
      },

      {
        path: "/campaign/:id",
        name: "CampaignDetails",
        component: () => import('@/vues/campaign/vues/campaignDetails/CampaignDetails.vue'),
        meta: {
          skipAuth: true,
        },
      },

      {
        path: '/lottery/:id',
        name: 'LotteryDetails',
        component: () => import('@/vues/lottery/vues/details/LotteryDetails.vue'),
      },

    ]
  },

  {
    path: '/back-office',
    name: 'BackOffice',
    component: BackOffice,
    children: [
      {
        path: 'users',
        name: 'Users',
        component: Users,
        children: [
          {
            path: 'back-office',
            component: () => import('@/vues/backoffice/vues/users/backoffice-users/BackOfficeUsers.vue'),
          },
    
          {
            path: 'partner',
            component: () => import('@/vues/backoffice/vues/users/partner-users/PartnerUsers.vue'),
          },
    
          {
            path: 'lottery',
            component: () => import('@/vues/backoffice/vues/users/lottery-users/LotteryUsers.vue')
          },
        ],
      },

      {
        path: 'partner',
        name: 'Partners',
        component: () => import('@/vues/backoffice/vues/partner/Partner.vue'),
      },

      {
        path: 'campaign',
        name: 'Campaigns',
        component: () => import('@/vues/backoffice/vues/campaign/Campaign.vue'),
      },

      {
        name: 'Campaign Approval',
        path: 'campaign/awaiting_approval',
        component: () => import('@/vues/backoffice/vues/campaign/modules/approvals/CampaignApproval.vue'),
      }
    ]
  },

  {
    path: '/lottery',
    name: 'Lottery',
    component: Lottery,
  
    children: [
      // {
      //   path: '',
      //   name: 'LotteryHome',
      //   component: () => import('@/vues/lottery/vues/list/LotteryHome.vue'),
      // },

    
    ]
  },

  {
    path: '/campaign',
    name: 'Campaign',
    component: Campaign,
    children: [
      // {
      //   path: '',
      //   name: 'CampaignHome',
      //   component: () => import('@/vues/campaign/vues/list/CampaignHome.vue'),
      // },

      {
        path: ':id',
        name: 'CampaignDetails',
        component: () => import('@/vues/campaign/vues/details/CampaignDetails.vue'),
      },
 
    ]
  },

  {
    path: '/payment_integration',
    name: 'PaymentIntegration',
    component: () => import('@/vues/payment_integration/PaymentIntegration.vue'),
    meta: {
      skipAuth: true,
    },
  },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(guard);
router.afterEach(afterRouteScriptLoader);

export default router;
