import { Button, Layout, Menu } from 'antd';
import { PoweroffOutlined, SettingTwoTone } from '@ant-design/icons';
import { Link,withRouter,RouteComponentProps } from 'react-router-dom';
import '../static/css/layout.css'
import React from 'react';
import { RouteInfo_Settings,RouteInfo_Dashboard } from '../models/RouteConfig';

const { Header, Content, Sider } = Layout;

interface IAdminLayout extends RouteComponentProps{

}

class AdminLayout extends React.Component<IAdminLayout>{
  state = {
    current: RouteInfo_Dashboard.Dashboard,
    leftMenu:()=>{
      return this.LeftMenus_Dashboard;
    },
    selectedKeys:'',
    defaultselectedKeys:''
  };

  LeftMenus_Dashboard = (
        <Menu.Item key={RouteInfo_Dashboard.Dashboard} icon={<SettingTwoTone />}>
          <Link to='/'>DashBoard</Link>
        </Menu.Item>
  )

  LeftMenus_Settings = (
      <><Menu.Item key={RouteInfo_Settings.SupportItems} icon={<SettingTwoTone />}>
      <Link to={RouteInfo_Settings.SupportItems}>Support item</Link>
    </Menu.Item><Menu.Item key={RouteInfo_Settings.Staffs} icon={<SettingTwoTone />}>
        <Link to={RouteInfo_Settings.Staffs}>Staff</Link>
      </Menu.Item></>         
  )

  handleClick = (e:any) => {
    switch (e.key) {
      case RouteInfo_Dashboard.MenuInfo:
        this.setState({ 
          current: e.key,
          leftMenu: ()=>{
            return this.LeftMenus_Dashboard;
          },
          selectedKeys:RouteInfo_Dashboard.Dashboard,
          defaultselectedKeys:RouteInfo_Dashboard.Dashboard,
        });
        this.props.history.push('/')
        break;
    case RouteInfo_Settings.MenuInfo:
      this.setState({ 
        current: e.key,
        leftMenu: ()=>{
          return this.LeftMenus_Settings;
        },
        selectedKeys:RouteInfo_Settings.Staffs,
        defaultselectedKeys:RouteInfo_Settings.Staffs
      });
        this.props.history.push(RouteInfo_Settings.Staffs)
        break;
  
      default:
        this.setState({ 
          current: e.key,
          leftMenu: ()=>{
            return this.LeftMenus_Dashboard;
          },
          selectedKeys:RouteInfo_Dashboard.Dashboard,
          defaultselectedKeys:RouteInfo_Dashboard.Dashboard,
        });
        this.props.history.push('/')
        break;
    }
  };

  handleItemClick = (e:any) => {
    this.setState({ 
      selectedKeys: e.key,
    });
  };

 changeMenuByUrl = (path:string)=>{
  let routepath = path.split('?')[0]
  console.log(routepath)
  let currentMenu = '';
  let leftMenu:any;
  if(RouteInfo_Dashboard.AllInfo.indexOf(routepath) !== -1){
   currentMenu = RouteInfo_Dashboard.MenuInfo;
   leftMenu = this.LeftMenus_Dashboard;
  }
  else if(RouteInfo_Settings.AllInfo.indexOf(routepath) !== -1){
    currentMenu = RouteInfo_Settings.MenuInfo;
   leftMenu = this.LeftMenus_Settings;
  }
  this.setState({ 
    current: currentMenu,
    leftMenu: ()=>{
      return leftMenu;
    },
    selectedKeys:routepath
  });
 }
 componentDidMount(){
  let path = this.props.history.location.pathname;
  this.changeMenuByUrl(path);
}

 

  render(){
    const { current,leftMenu,selectedKeys,defaultselectedKeys} = this.state;
    return(
      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="light" mode="horizontal" onClick={this.handleClick} selectedKeys={[current]} defaultSelectedKeys={[RouteInfo_Dashboard.MenuInfo]}>
        <Menu.Item key={RouteInfo_Dashboard.MenuInfo}>{RouteInfo_Dashboard.MenuInfo}</Menu.Item>
        <Menu.Item key={RouteInfo_Settings.MenuInfo}>{RouteInfo_Settings.MenuInfo}</Menu.Item>
        <div className="userFeatures"><PoweroffOutlined/></div>
      </Menu>
      
     
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
      <Menu
              mode="inline"
              defaultSelectedKeys={[defaultselectedKeys]}
              defaultOpenKeys={[defaultselectedKeys]}
              style={{ height: '100%', borderRight: 0 }}
              openKeys={[selectedKeys]}
              selectedKeys={[selectedKeys]}
              forceSubMenuRender={true}
              onClick={this.handleItemClick}
            >
        {leftMenu()}
        </Menu>
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