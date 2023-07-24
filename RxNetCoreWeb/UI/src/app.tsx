import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { RequestOptionsInit, ResponseError } from 'umi-request';
import { notification } from 'antd';
import TagView from './components/TagView';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const eqpPath = '/EqpListShow2';
const eqpQueryPath = '/EqpQuery';
const pmHisPath = '/PmHistory';
const pmHisChartPath = '/PmChart';
const bmHisPath = '/ChecklistHistory';
const bmHisChartPath = '/ChecklistChart';
const eqpQcShow = '/EqpQcShow';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      let data = sessionStorage.getItem('userData');

      if (data == null)
        return undefined;

      let userData: API.CurrentUser = JSON.parse(data || "{}");
      return userData;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    logo: [<img alt="logo" src="/logo.png" />],
    rightContentRender: () => <div />,//<RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      // content: initialState?.currentUser?.name,
    },
    footerRender: () => <div />,//() => <Footer />,
    onPageChange: () => {
      const nowloc = window.location;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (history.location.pathname == "/EqpQuery" || location.search.includes("EqpQuery")) {
        history.push({
          pathname: '/EqpQuery',
          search: location.search.indexOf("=") >= 0 && location.search.length >= 10 ? location.search.substring(10) : location.search.substring(1),
          state: {
            location
          }
        });
      } else if (!initialState?.currentUser && location.pathname !== loginPath) {
        if (history.location.pathname == "/EqpListShow2" || location.search.includes("EqpListShow2")) {
          history.push(eqpPath);
        } else if (history.location.pathname == "/PmHistory" || location.search.includes("PmHistory")) {
          history.push(pmHisPath);
        } else if (history.location.pathname == "/PmChart" || location.search.includes("PmChart")) {
          history.push(pmHisChartPath);
        } else if (history.location.pathname == "/ChecklistHistory" || location.search.includes("ChecklistHistory")) {
          history.push(bmHisPath);
        } else if (history.location.pathname == "/ChecklistChart" || location.search.includes("ChecklistChart")) {
          history.push(bmHisChartPath);
        } else if (history.location.pathname == "/EqpQcShow" || location.search.includes("EqpQcShow")) {
          history.push(eqpQcShow);
        } else {
          history.push(loginPath);
        }
      }
    },
    links: isDev
      ? [
        <Link to="/~docs">
          <BookOutlined />
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {initialState?.currentUser && location.pathname !== loginPath ? (
            <TagView children={children} home="/welcome" />
          ) : (
            children
          )}
          {!props.location?.pathname?.includes('/login') && (
            null
            // <SettingDrawer
            //   enableDarkTheme
            //   settings={initialState?.settings}
            //   onSettingChange={(settings) => {
            //     setInitialState((preInitialState) => ({
            //       ...preInitialState,
            //       settings,
            //     }));
            //   }}
            // />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * 异常处理程序
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  // throw error;
};

// src/app.ts
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = { Authorization: 'Bearer xxxxxx' };
  let token = sessionStorage.getItem('authToken');
  if (token)
    options.headers = { 'Authorization': 'Bearer ' + token };

  return (
    {
      url: url,
      options: options,
    }
  );

  // return {
  //   url: `${url}`,
  //   options: { ...options, interceptors: true, headers: authHeader },
  // };
};

export const request: RequestConfig = {
  errorHandler,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
};

