export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/adminAnalysis' },
      // dashboards 本系统不用
      /*{
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        authority: ['admin'],
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },*/
      // forms 表单 本系统不用
      /*{
        path: '/form',
        icon: 'form',
        name: 'form',
        authority: ['admin'],
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },*/
      // list 列表页 本系统不用
      /*{
        path: '/list',
        icon: 'table',
        name: 'list',
        authority: ['admin'],
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },*/
      // 详情页 本系统不用
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   authority: ['admin'],
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/basic/:id',
      //       name: 'basic',
      //       hideInMenu: true,
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // 结果页面 本系统不用
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   authority: ['admin'],
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // 异常页 本系统用
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        authority: ['admin', 'teacher', 'student'],
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      // 账户页 本系统用来修改密码
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        authority: ['teacher', 'admin', 'student'],
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      // 首页数据可视化页面 教师以及管理员身份
      {
        path: '/adminAnalysis',
        component: './Admin/AdminAnalysis',
        name: 'adminAnalysis',
        authority: ['admin', 'teacher', 'student'],
        icon: 'dashboard',
      },
      // 教师管理页面 管理员身份
      {
        path: '/teacherManage',
        component: './Teacher/TeacherManage',
        name: 'teacher',
        icon: 'team',
        authority: ['admin'],
      },
      // 学生管理页面 管理员身份
      {
        path: '/studentManage',
        component: './Student/StudentManage',
        name: 'student',
        icon: 'team',
        authority: ['admin'],
      },
      {
        path: '/classsManage',
        component: './Class/ClassManage',
        name: 'class',
        icon: 'table',
        authority: ['admin'],
      },
      // 课程管理页面 管理员身份
      {
        path: '/courseManage',
        component: './Course/CourseManage',
        name: 'course',
        icon: 'table',
        authority: ['admin'],
      },
      // 课程管理详情页 管理员身份
      {
        path: '/courseManage/courseDetail/:id',
        component: './CourseDetail/CourseDetail',
        name: 'courseDetail',
        hideInMenu: true,
      },
      // 教师课程列表与签到
      {
        path: '/courseCardList',
        component: './CourseCardList/CourseCardList',
        name: 'courseCardList',
        authority: ['teacher'],
        icon: 'schedule',
      },
      {
        path: '/courseCardList/teacherCourseDetail/:courseId',
        component: './CourseCardList/TeacherCourseDetail/CourseDetail',
        name: 'courseDetail',
        authority: ['teacher'],
        hideInMenu: true,
      },
      {
        path: '/courseCardList/teacherCourseDetail/:courseId/checkIn',
        component: './CourseCardList/CheckIn/CheckIn',
        name: 'checkIn',
        authority: ['teacher'],
        hideInMenu: true,
      },
      // 学生课程列表与课程详情
      {
        path: '/courseCardListStu',
        component: './CourseCardListStu/CourseCardList',
        name: 'courseCardList',
        authority: ['student'],
        icon: 'schedule',
      },
      {
        path: '/courseCardListStu/studentCourseDetail/:courseId',
        component: './CourseCardListStu/StudentCourseDetail/CourseDetail',
        name: 'courseDetail',
        authority: ['student'],
        hideInMenu: true,
      },
      {
        component: '404',
      },
    ],
  },
];
