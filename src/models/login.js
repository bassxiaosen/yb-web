import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, login } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from "antd"

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // 判断返回结果 加staus ok或者error
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response.status === 1) {
        // message.error('登录失败，请检查账号与密码')
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            type: 'account',
            authority: 'guest',
          }
        })
      }
      const { authority, userId } = response.data.content
      console.log(response.status)
      window.localStorage.setItem('userId', userId)
      yield put({
        type: 'changeLoginStatus',
        payload: response.data.content,
      });
      // Login successfully
      if (response.status === 0) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          // currentAuthority: 'guest',
          authority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
          // search: stringify({
          //   redirect: window.location.href,
          // }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      console.log(payload)
      setAuthority(payload.authority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
