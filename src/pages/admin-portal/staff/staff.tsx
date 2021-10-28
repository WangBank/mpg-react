import { Table, Button, Space,Modal, Form, Input, Radio } from 'antd';
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
    this.props.StaffStore.models.showAddForm = true;
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

          <StaffAddForm
            visible={StaffStore.models.showAddForm}
            onCreate={StaffStore.Create}
            onCancel={StaffStore.Cancel}
          >

          </StaffAddForm>
      </div>
    );
  }

}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface StaffAddFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}


const StaffAddForm: React.FC<StaffAddFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add staff"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="first_name"
          label="First name"
          rules={[{ required: true, message: 'Please input the first name of staff!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last name"
          rules={[{ required: true, message: 'Please input the last name of staff!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true,type:'email', message: 'Please input the email of staff!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Mobile Number"
          rules={[{ required: true, message: 'Please input the phone of staff!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Staff Status"
          rules={[{ required: true, message: 'Please select the status of staff!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default Staff