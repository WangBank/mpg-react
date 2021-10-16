import { Form, Input, Button } from 'antd';
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../static/css/login.css'
import signinImg from '../static/img/logo-for-signin.png';
import { observer, inject } from "mobx-react";


interface ILoginProps{
  LoginStore?: any,
}

@inject("LoginStore")
@observer
class Login extends React.Component<ILoginProps> {
  signin = (data:any) => {
    this.props.LoginStore.username = data.username;
    this.props.LoginStore.password = data.password;
    this.props.LoginStore.signin();
  };
  render() {
    return (
      <div className="login-bg">
         <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={this.signin}
        >
      <div className="signin-logo">
        <img src={signinImg} alt=''></img>
        </div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
     
    );
  }
  
};

export default Login