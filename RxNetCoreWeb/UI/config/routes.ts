export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/EqpListShow2',
    layout: false,
    name: 'EqpListShow',
    component: './EqpManage/EqpListShow2',
    hideInMenu: true,
  },
  {
    path: '/EqpQuery',
    layout: false,
    name: 'EqpQuery',
    component: './EqpManage/EqpQuery',
    hideInMenu: true,
  },
  {
    path: '/PmHistory',
    layout: false,
    name: 'PmHistory',
    component: './EqpManage/PmHistory',
    hideInMenu: true,
  },
  {
    path: '/PmChart',
    layout: false,
    name: 'PmChart',
    component: './EqpManage/PmHistoryChart',
    hideInMenu: true,
  },
  {
    path: '/ChecklistHistory',
    layout: false,
    name: 'BmHistory',
    component: './EqpManage/BmHistory',
    hideInMenu: true,
  },
  {
    path: '/ChecklistChart',
    layout: false,
    name: 'BmChart',
    component: './EqpManage/BmHistoryChart',
    hideInMenu: true,
  },
  {
    path: '/EqpQcShow',
    layout: false,
    name: 'EqpQcShow',
    component: './EqpManage/EqpQcShow',
    hideInMenu: true,
  },

  {
    path: '/EqpListShow',
    name: 'EqpListShow',
    icon: 'desktop',
    component: './EqpManage/EqpListShow',
    hideInMenu: true,
  },
  {
    path: '/EqpManage',
    name: 'eqpmanage',
    icon: 'desktop',
    routes: [
      {
        path: '/EqpManage/QcManage',
        name: 'qcManage',
        component: './EqpManage/QcManage',
      },
      {
        path: '/EqpManage/PmCheckList',
        name: 'pmCheckList',
        component: './EqpManage/PmCheckList',
      },
      {
        path: '/EqpManage/stbManage',
        name: 'stbManage',
        component: './EqpManage/stbManage',
      },
      {
        path: '/EqpManage/PmManage',
        name: 'pmManage',
        component: './EqpManage/PmManage',
      },
      {
        path: '/EqpManage/BmCheckList',
        name: 'bmCheckList',
        component: './EqpManage/BmCheckList',
      },
      {
        path: '/EqpManage/EqpPartsManage',
        name: 'EqpPartsManage',
        component: './EqpManage/EqpPartsManage',
      },
      {
        path: '/EqpManage/PmBmHistory',
        name: 'pmBmHistory',
        component: './EqpManage/PmBmHistory',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/ReportManage',
    name: 'ReportManage',
    icon: 'desktop',
    routes: [
      {
        path: '/ReportManage/BStageMap',
        name: 'BStageMap',
        component: './ReportManage/BStageMap',
      },
      {
        path: '/ReportManage/BRepstage',
        name: 'BRepstage',
        component: './ReportManage/BRepstage',
      },
      {
        path: '/ReportManage/RandyEpmTar',
        name: 'RandyEpmTar',
        component: './ReportManage/RandyEpmTar',
      },
      {
        path: '/ReportManage/WtTargetIndex',
        name: 'WtTargetIndex',
        component: './ReportManage/WtTargetIndex',
      },
      {
        path: '/ReportManage/CustProductSetting',
        name: 'CustProductSetting',
        component: './ReportManage/CustProductSetting',
      },
      {
        path: '/ReportManage/BCapagroup',
        name: 'BCapagroup',
        component: './ReportManage/BCapagroup',
      },
      {
        path: '/ReportManage/BCapagroupMap',
        name: 'BCapagroupMap',
        component: './ReportManage/BCapagroupMap',
      },
      {
        path: '/ReportManage/BCapagroupType',
        name: 'BCapagroupType',
        component: './ReportManage/BCapagroupType',
      },
      {
        path: '/ReportManage/BCapagroupMove',
        name: 'BCapagroupMove',
        component: './ReportManage/BCapagroupMove',
      },
    ],
  },
  // 账号管理
  // {
  //   path: '/account',
  //   name: 'account',
  //   icon: 'desktop',
  //   access: 'USER_MNGBB',
  //   routes: [
  //     {
  //       access: 'USER_MNG5',
  //       path: '/account/userManager',
  //       name: 'userManager',
  //       component: './AccountManager/UserManager',
  //     },
  //     {
  //       access: 'USER_MNG4',
  //       path: '/account/roleManager',
  //       name: 'roleManager',
  //       component: './AccountManager/RoleManager',
  //     },
  //     {
  //       access: 'USER_MNG7',
  //       path: '/account/menuManager',
  //       name: 'menuManager',
  //       component: './AccountManager/MenuManager',
  //     }
  //   ],
  // },
  // {
  //   path: '/appSetting',
  //   name: 'appSetting',
  //   icon: 'setting',
  //   component: './AppSetting',
  //   access: 'APP_MNG',
  // },
  // {
  //   path: '/edcspc',
  //   name: 'edcspc',
  //   icon: 'desktop',
  //   routes: [
  //     {
  //       path: '/edcspc/measurespec',
  //       name: 'measurespec',
  //       component: './edcspc/MeasureSpec',
  //     },
  //     {
  //       path: '/edcspc/charttemplate',
  //       name: 'charttemplate',
  //       component: './edcspc/ChartTemplate',
  //     },
  //     {
  //       path: '/edcspc/edcchart',
  //       name: 'edcchart',
  //       component: './edcspc/EdcChart',
  //     },
  //     {
  //       path: '/edcspc/systemrule',
  //       name: 'systemrule',
  //       component: './edcspc/SystemRule',
  //     },
  //     {
  //       path: '/edcspc/customrule',
  //       name: 'customrule',
  //       component: './edcspc/CustomRule',
  //     },
  //     {
  //       path: '/edcspc/catagory',
  //       name: 'catagory',
  //       component: './edcspc/SpcCatagory',
  //     }
  //   ],
  // },
  // {
  //   path: '/ocap',
  //   name: 'ocap',
  //   icon: 'desktop',
  //   routes: [],
  // },
  // {
  //   path: '/spccharts',
  //   name: 'spccharts',
  //   icon: 'desktop',
  //   routes: [
  //     {
  //       path: '/spccharts/chartquery',
  //       name: 'chartquery',
  //       component: './spcquery/ChartQuery',
  //     },
  //     {
  //       path: '/spccharts/singleview',
  //       name: 'singleview',
  //       hideInMenu: true,
  //       component: './spcquery/ChartQuery/SingleChartView',
  //     },
  //     {
  //       path: '/spccharts/xbar',
  //       name: 'xbar',
  //       component: './spcquery/SpcCharts/XBar',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
