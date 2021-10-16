import { Table, Button, Space } from 'antd';
import React from 'react';
import { observer, inject } from "mobx-react";


interface IStaffProps{
  StaffStore?: any,
}
let columns:any[] =[]
@inject("StaffStore")
@observer
class Staff extends React.Component<IStaffProps> {
  
  getStaffList = () => {
    this.props.StaffStore.getStaffList();
  }

  componentDidMount(){
    this.getStaffList();
  }

  render() {
   
    const { StaffStore } = this.props;

    return (
      <div>
        <Button onClick={this.getStaffList}>Search</Button>
        <Table 
            rowKey='id'
            size="middle"
            pagination={{current: StaffStore.page, pageSize: StaffStore.page_size, total: StaffStore.total}}
            dataSource={StaffStore.models.StaffList}
            loading={StaffStore.models.isLoading}
            rowClassName={(record, index) => {
              let className = 'light-row';
              if (index % 2 === 1) className = 'dark-row';
              return className;
            }}
            onChange={pagination => {
              StaffStore.updatePage(pagination.current)
            }}
          >
              
          </Table>
      </div>
    );
  }
}

export default Staff