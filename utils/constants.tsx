import { MdOutlineDescription, MdSaveAlt, MdMoveToInbox, MdOutlineBuild, MdInbox } from 'react-icons/md'
import React from 'react';

type MenuOption = {
  [x: string]: {
    name: string
    icon: any,
    fullPage: boolean,
    link: string
  }[]
}

export const ROUTES = {
  AUTH: '/',
  LOGIN: '/login',
  PROPOSALS: '/proposals',
  VERIFY: '/verify',
  RFP_VIEWER: '/rfp_viewer/:id',
  DASHBOARD: '/dashboard',
  DASHBOARD_HOME: '/dashboard/home',
  DASHBOARD_MY_RFPS: '/dashboard/my_rfps',
  DASHBOARD_FORM_BUILDER: '/dashboard/form_builder',
  DASHBOARD_PROPOSALS: '/dashboard/proposals',
  DASHBOARD_PROPOSALS_RFP: '/dashboard/proposals_rfp/:id',
  DASHBOARD_TOOLKIT: '/dashboard/toolkit',
  DASHBOARD_MARKETPLACE: '/dashboard/marketplace',
  DASHBOARD_SUBMISSION_DETAILS: '/dashboard/submission_details/:id?',
  DASHBOARD_RFP_DETAILS: '/dashboard/rfp_details/:id',
  DASHBOARD_MY_ACCOUNT: '/dashboard/account/myaccount',
  DASHBOARD_BUSINESS_ACCOUNT: '/dashboard/account/business',
  DASHBOARD_MY_TEAM: '/dashboard/account/myteam',
  DASHBOARD_NOTIFICATIONS: '',
  DASHBOARD_MY_WORKSPACE: '',
  DASHBOARD_MY_PRODUCTS: '',
  VENDOR_ACCOUNT: '',
  PASSWORD: '/password',
  RESET_PASSWORD: '/reset-password',
  RESET_LINK_SENT: '/reset-link-sent',
  RFP_EDITOR: '/rfp_editor/:id',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER: '/register',
  ONBOARDING: '/onboarding',
  ONBOARDING_ABOUT_YOU: '/onboarding/about-you',
  ONBOARDING_YOUR_ORGANIZATION: '/onboarding/your-organization',
  ONBOARDING_YOUR_TEAM: '/onboarding/your-team',
  RFP_SHARED: '/rfp/share/:token',
  ACCEPT_INVITATION: '/accept-invitation',
  PUBLIC_COMPANY_DETAILS: '/business_profile/:slug',
  PRODUCT_EDITOR: '/product_editor/:id',
  DASHBOARD_WORKSPACE: '/dashboard/workspace',
  DASHBOARD_PRODUCTS: '/dashboard/products',
  SUBMISSION: '/rfp/:rfpId?/submit_proposal/:id?',
  PRODUCT_PREVIEW: '/product_preview/:id',
};

export const MENU_OPTIONS: MenuOption = {
  buyer: [
    {
      name: 'dashboard_menu_title',
      icon: <MdSaveAlt />,
      fullPage: false,
      link: ROUTES.DASHBOARD_PROPOSALS,
    },
    {
      name: 'myrfp_nav_title',
      icon: <MdOutlineDescription />,
      fullPage: false,
      link: ROUTES.DASHBOARD_MY_RFPS,
    },
    {
      name: 'templates_title',
      icon: <MdInbox />,
      fullPage: false,
      link: ROUTES.DASHBOARD_PROPOSALS,
    },
    {
      name: 'proposals_nav_title',
      icon: <MdSaveAlt />,
      fullPage: false,
      link: ROUTES.DASHBOARD_PROPOSALS,
    },
  ],
  vendor: [
    {
      name: 'workspace_title',
      icon: <MdSaveAlt />,
      fullPage: false,
      link: ROUTES.DASHBOARD_WORKSPACE,
    },
    {
      name: 'templates_title',
      icon: <MdMoveToInbox />,
      fullPage: false,
      link: ROUTES.DASHBOARD_PROPOSALS,
    },
    {
      name: 'products_title',
      icon: <MdOutlineBuild />,
      fullPage: false,
      link: ROUTES.DASHBOARD_PRODUCTS,
    },
  ],
};

export const MAX_RFP_TAGS = 10;
export const MAX_PRODUCT_CATEGORIES_TAGS = 5;

export const BUDGET_TYPE = ['USD', 'EUR'];

export const PAGE_ACCESS_BY_ROLE = {
  DASHBOARD_MY_ACCOUNT: '*',
  DASHBOARD_BUSINESS_ACCOUNT: '*',
  DASHBOARD_MY_TEAM: ['admin', 'owner'],
  DASHBOARD_NOTIFICATIONS: '*',
};

export const USER_USAGE_TYPE = {
  BUYER: 'buyer',
  VENDOR: 'vendor',
};

export const PAGE_ACCESS_BY_USAGE_TYPE = {
  PRODUCT_EDITOR: USER_USAGE_TYPE.VENDOR,
  PRODUCT_PREVIEW: USER_USAGE_TYPE.VENDOR,
  SUBMISSION: USER_USAGE_TYPE.VENDOR,
  DASHBOARD_MY_RFPS: USER_USAGE_TYPE.BUYER,
};

export const ROLES = {
  rolesDef: ['admin', 'user'],
};

const constants = {
  localStorageKeys: {
    authToken: 'AUTH_TOKEN',
  },
  RFP_STATUS: {
    SAVED: 'saved',
    NOT_SAVED: 'not saved',
  },
  DATE_FORMAT: 'MMM dd, yyyy',
};

export const LOGO_TYPE_ALLOWED = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/svg'];
export const MEDIA_VIDEO_ALLOWED = ['video/mp4'];

export const COMPANY_SIZE = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5001-10,000',
  '10,001+',
];

export const COUNTRIES_LIST = ['United States of America'];

export const STATES_LIST = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Jersey',
  'New York',
  'New Hampshire',
  'New Mexico',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington DC',
  'West Virginia',
  'Washington',
  'Wisconsin',
  'Wyoming',
];

export default constants;
