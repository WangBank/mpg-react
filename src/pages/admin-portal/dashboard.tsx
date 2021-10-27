import { inject, observer } from "mobx-react";
import React from "react";
import { Component } from "react";

interface IDashboard{
  LoginStore?: any,
}
@inject("LoginStore")
@observer
class Dashboard extends React.Component<IDashboard>{
  
  componentDidMount(){
    this.props.LoginStore.active();
  }

  render(){

    return (
      <div>
        dashboard
      </div>
    )
  }
}

export default Dashboard