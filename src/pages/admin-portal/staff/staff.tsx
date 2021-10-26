import { Table, Button, Space } from 'antd';
import React from 'react';
import { observer, inject } from "mobx-react";


interface IStaffProps{
  StaffStore?: any,
}
@inject("StaffStore")
@observer
class Staff extends React.Component<IStaffProps> {
  
  getStaffList = () => {
    this.props.StaffStore.getStaffList();
  }

  addStaff= ()=>{

  }

  editStaff= ()=>{

  }

  deleteStaff= ()=>{

  }

  componentDidMount(){
    this.getStaffList();
  }

  render() {
   
    const { StaffStore } = this.props;

    return (
      <div>
        <Space size="middle">
        <Button type='primary' size="middle" onClick={this.addStaff}>Add</Button>
        <Button type='default' size="middle" onClick={this.getStaffList}>Search</Button>
        </Space>
      
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
            <Table.Column
            title='Name'
            key='Name'
            render= {(record:any) => (
              record.first_name +' '+record.last_name
            )}
            />
            <Table.Column
            title='Email'
            key='email'
            dataIndex='email'
            />

            <Table.Column
            title='Mobile Number'
            key='phone'
            dataIndex='phone'
            />

          <Table.Column
            title=' Credential Level'
            key='staff_level'
            dataIndex='staff_level'
            />

          <Table.Column
            title='Status'
            key='status'
            dataIndex='status_name'
            />

          <Table.Column
            title='Action'
            key='Action'
            render = {
              (record:any) => (
              <Space size="middle">
                <a href='#' onClick={this.editStaff}>Details</a>
                <a href='#' onClick={this.deleteStaff}>Delete</a>
              </Space>
              )
            }
            />
           
          </Table>
      </div>
    );
  }
}

export default Staff