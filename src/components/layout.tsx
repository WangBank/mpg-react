import { Layout, Menu } from 'antd';
import { SettingTwoTone } from '@ant-design/icons';
import { Link,withRouter,RouteComponentProps } from 'react-router-dom';
import '../static/css/layout.css'
import React from 'react';

const { Header, Content, Sider } = Layout;

interface IAdminLayout extends RouteComponentProps{

}

class AdminLayout extends React.Component<IAdminLayout>{
  state = {
    current: 'Dashboard',
    leftMenu:()=>{
      return this.LeftMenus_Dashboard;
    }
  };

  LeftMenus_Dashboard = (
        <Menu
          mode="inline"
          defaultSelectedKeys={['Dashboard']}
          defaultOpenKeys={['Dashboard']}
          style={{ height: '100%', borderRight: 0 }}
          selectedKeys={['Dashboard']}
          openKeys={['Dashboard']}
          forceSubMenuRender={true}
        >
        <Menu.Item key="Dashboard" icon={<SettingTwoTone />}>
          <Link to='/'>DashBoard</Link>
        </Menu.Item>
        </Menu>
  )

  LeftMenus_Settings = (
            <Menu
              mode="inline"
              defaultSelectedKeys={['SupportItems']}
              defaultOpenKeys={['SupportItems']}
              style={{ height: '100%', borderRight: 0 }}
              selectedKeys={['SupportItems']}
              openKeys={['SupportItems']}
              forceSubMenuRender={true}
            >
            <Menu.Item key="SupportItems" icon={<SettingTwoTone />}>
              <Link to='/admin/support-items'>Support item</Link>
            </Menu.Item>
            <Menu.Item key="Staff" icon={<SettingTwoTone />}>
              <Link to='/admin/staff'>Staff</Link>
            </Menu.Item>
            </Menu>
)

  handleClick = (e:any) => {
    console.log(e)
    switch (e.key) {
      case 'Dashboard':
        this.setState({ current: e.key,leftMenu: ()=>{
          return this.LeftMenus_Dashboard;
        }});
        this.props.history.push('/')
        break;
    case 'Settings':
        this.setState({ current: e.key,leftMenu: ()=>{
          return this.LeftMenus_Settings;
        }});
        this.props.history.push('/admin/support-items')
        break;
  
      default:
        this.setState({ current: e.key,leftMenu: ()=>{
          return this.LeftMenus_Settings;
        }});
        this.props.history.push('/')
        break;
    }
  };
  render(){
    const { current,leftMenu} = this.state;
    return(
      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="light" mode="horizontal" onClick={this.handleClick} selectedKeys={[current]} defaultSelectedKeys={['Dashboard']}>
        <Menu.Item key="Dashboard">Dashboard</Menu.Item>
        <Menu.Item key="Settings">Settings</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        {leftMenu()}
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
      )
  }
}

export default withRouter(AdminLayout);