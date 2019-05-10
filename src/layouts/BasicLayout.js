import React, { Suspense } from 'react';
import { Layout, Modal, Form, Input, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import logo from '../assets/logo.svg';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';
import styles from './BasicLayout.less';
import request from "@/utils/request"
import lurl from "@/utils/lurl"

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

const ChangePasswordForm = Form.create({name:'changeForm'})(
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onOk, form
      } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title="修改密码"
          okText="确定"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onOk}
        >
        <Form layout="vertical">
            <Form.Item label="旧密码">
              {
                getFieldDecorator('oldPassword', {
                  rules: [{required: true, message: '请输入密码'}]
                })(
                  <Input type="password"/>
                )
              }
            </Form.Item>
          </Form>
          <Form layout="vertical">
            <Form.Item label="新密码">
              {
                getFieldDecorator('newPassword', {
                  rules: [{required: true, message: '请输入密码'}]
                })(
                  <Input type="password"/>
                )
              }
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)

class BasicLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }

  }
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }
  handleChangeModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  postChangePassword = (body) => {
    return request(`${lurl}/user/updatePassword`, {
      method: 'POST',
      body
    }).then(()=>{
      message.success('修改密码成功')
    }).catch((err) => {
      message.error('修改密码失败')
    })
  }

  handleOk = async () => {
    const form = this.formRef.props.form
    form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      await this.postChangePassword({
        ...values,
        type: parseInt(localStorage.getItem('type')),
        userId: parseInt(localStorage.getItem('userId'))
      })
      form.resetFields()
      this.setState({
        visible: false,
      })
    })
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
    } = this.props;

    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            handleChangeModal={this.handleChangeModal}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense>
        <ChangePasswordForm
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // ref={this.formRef}
          wrappedComponentRef={(formRef) => {
            this.formRef = formRef
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
