import { Layout, Menu, Breadcrumb } from 'antd';
import { SettingTwoTone } from '@ant-design/icons';
import { Component } from 'react';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class AdminLayout extends Component{
  render(){
    return(
      <>
      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Dashboard']}>
      <Menu.Item key="Dashboard">Dashboard</Menu.Item>
      <Menu.Item key="Settings">Settings</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['SupportItems']}
          defaultOpenKeys={['SupportItems']}
          style={{ height: '100%', borderRight: 0 }}
        >
         <Menu.Item key="SupportItems" icon={<SettingTwoTone />}>
         <Link to='/admin/support-items'>Support items</Link>
        </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>Support items</Breadcrumb.Item>
        </Breadcrumb>
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
    
       </>
      )
  }
}

export default AdminLayout;