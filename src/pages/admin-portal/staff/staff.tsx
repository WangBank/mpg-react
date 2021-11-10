import { Table, Button, Space, Modal, Form, Input, Row, Col, Select } from 'antd';
import React from 'react';
import { observer, inject } from "mobx-react";
import {  StaffAddFormProps, StaffUpdateFormProps } from '../../../models/admin-portal/staff/StaffBaseModel';


interface IStaffProps {
  StaffStore?: any,
}
@inject("StaffStore")
@observer
class Staff extends React.Component<IStaffProps> {

  getStaffList = () => {
    this.props.StaffStore.getStaffList();
  }

  addStaff = async () => {
    await this.props.StaffStore.GetAddStaffSelectInfo();
    this.props.StaffStore.models.showAddForm = true;
  }

  updateStaff = async (id:string) => {
    await this.props.StaffStore.GetStaffInfo(id);
  }

  deleteStaff = () => {

  }

  componentDidMount() {
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
          pagination={{ current: StaffStore.page, pageSize: StaffStore.page_size, total: StaffStore.total }}
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
            render={(record: any) => (
              record.first_name + ' ' + record.last_name
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
            render={
              (record: any) => (
                <Space size="middle">
                  <a href='#' onClick={()=>this.updateStaff(record.id)}>Details</a>
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
          StaffStore={StaffStore}
        >

        </StaffAddForm>

        <StaffUpdateForm
          visible={StaffStore.models.showUpdateForm}
          onUpdate={StaffStore.Update}
          onCancel={StaffStore.Cancel}
          StaffStore={StaffStore}
        >

        </StaffUpdateForm>
      </div>
    );
  }

}


const StaffAddForm: React.FC<StaffAddFormProps> = ({
  visible,
  onCreate,
  onCancel,
  StaffStore
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <Modal
      visible={visible}
      title="Add staff"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      width={window.innerWidth * 0.75}
      onOk={() => {
        form
          .validateFields()
          .then(data => {
            onCreate(data);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="staff_add_form"
        size="small"
        labelCol={{
          style: { width: 120 }
        }}

      >
        <Row gutter={16}>
          <Col offset={2} span={8}>
            <Form.Item
              name="first_name"
              label="First name"
              rules={[{ required: true, message: 'Please input the first name of staff!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col offset={4} span={8}>
            <Form.Item
              name="street"
              label="Street"
              rules={[{ required: true, message: 'Please input the street of staff!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={8}>
            <Form.Item
              name="last_name"
              label="Last name"
              rules={[{ required: true, message: 'Please input the last name of staff!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col offset={4} span={8}>
            <Form.Item
              name="suburb"
              label="Suburb"
              rules={[{ required: true, message: 'Please input the Suburb of staff!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={8}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[{ required: true, type: 'email', message: 'Please input the email of staff!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col offset={4} span={8}>
            <Form.Item
              name="state_id"
              label="State"
              rules={[{ required: true, message: 'Please select the state of staff!' }]}
            >
              <Select>
                {
                  StaffStore.SelectOptions.States.map((d: { key: string; label: string; }) => (<Option key={d.key} value={d.key} title={d.label}>{d.label}</Option>))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={8}>
            <Form.Item
              name="phone"
              label="Mobile Number"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col offset={4} span={8}>
            <Form.Item
              name="postcode"
              label="Post Code"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item

              name="status"
              label="Staff Status"
              rules={[{ required: true, message: 'Please select the status of staff!' }]}
            >
              <Select>
                {
                  StaffStore.SelectOptions.StaffStatus.map((d: { key: string; label: string; }) => (<Option key={d.key} value={d.key} title={d.label}>{d.label}</Option>))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item name="states_id" label="View States">
              <Select
                mode="multiple"
                allowClear>
                <Option key="72beb2f8-b881-4035-9897-3aa04630cf4a" value="72beb2f8-b881-4035-9897-3aa04630cf4a" title="QLD">QLD</Option>
                <Option key="5c36f5d9-6dc6-4eae-93a6-5726c7a16d0c" value="5c36f5d9-6dc6-4eae-93a6-5726c7a16d0c" title="VIC">VIC</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item name="group_ids" label="Group">
              <Select
                mode="multiple"
                allowClear>
                {
                  StaffStore.SelectOptions.Group.map((d: { key: string; label: string; }) => (<Option key={d.key} value={d.key} title={d.label}>{d.label}</Option>))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item name="chart_template_id" label="Chart Template">
              <Select>
                {
                  StaffStore.SelectOptions.ChartTemplate.map((d: { key: string; label: string; }) => (<Option key={d.key} value={d.key} title={d.label}>{d.label}</Option>))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>




      </Form>
    </Modal>
  )
};


const StaffUpdateForm:React.FC<StaffUpdateFormProps> = ({
  visible,
  onUpdate,
  onCancel,
  StaffStore
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <Modal
      visible={visible}
      title="Update staff"
      okText="Save Profile"
      cancelText="Cancel"
      onCancel={onCancel}
      width={window.innerWidth * 0.75}
      onOk={() => {
        form
          .validateFields()
          .then(data => {
            onUpdate(data);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="staff_add_form"
        size="small"
        labelCol={{
          style: { width: 120 }
        }}

      >
        <Row gutter={16}>
          <Col offset={2} span={8}>
            <Form.Item
              name="first_name"
              label="First name"
              rules={[{ required: true, message: 'Please input the first name of staff!' }]}
            >
              <Input defaultValue={StaffStore.models.StaffUpdateData.first_name}/>
            </Form.Item>
          </Col>

          <Col offset={4} span={8}>
            <Form.Item
              name="street"
              label="Street"
              rules={[{ required: true, message: 'Please input the street of staff!' }]}
            >
              <Input defaultValue={StaffStore.models.StaffUpdateData.street}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={8}>
            <Form.Item
              name="last_name"
              label="Last name"
              rules={[{ required: true, message: 'Please input the last name of staff!' }]}
            >
              <Input defaultValue={StaffStore.models.StaffUpdateData.last_name}/>
            </Form.Item>
          </Col>

          <Col offset={4} span={8}>
            <Form.Item
              name="suburb"
              label="Suburb"
              rules={[{ required: true, message: 'Please input the Suburb of staff!' }]}
            >
              <Input defaultValue={StaffStore.models.StaffUpdateData.suburb}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={8}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[{ required: true, type: 'email', message: 'Please input the email of staff!' }]}
            >
              <Input defaultValue={StaffStore.models.StaffUpdateData.email}/>
            </Form.Item>
          </Col>

          <Col offset={4} span={8}>
            <Form.Item
              name="state_id"
              label="State"
              rules={[{ required: true, message: 'Please select the state of staff!' }]}
            >
              <Select
              defaultValue={StaffStore.models.StaffUpdateData.state_id}
              >
                {
                  StaffStore.SelectOptions.States.map((d: { key: string; label: string; }) => (<Option key={d.key} value={d.key} title={d.label}>{d.label}</Option>))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={8}>
            <Form.Item
              name="phone"
              label="Mobile Number"
            >
              <Input  defaultValue={StaffStore.models.StaffUpdateData.phone}/>
            </Form.Item>
          </Col>

          <Col offset={4} span={8}>
            <Form.Item
              name="postcode"
              label="Post Code"
            >
              <Input defaultValue={StaffStore.models.StaffUpdateData.postcode}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item

              name="status"
              label="Staff Status"
              rules={[{ required: true, message: 'Please select the status of staff!' }]}
            >
              <Select
              defaultValue={''+StaffStore.models.StaffUpdateData.status+''}
              >
                {
                  StaffStore.SelectOptions.StaffStatus.map((d: { key: string; label: string; }) => (<Option key={d.key} value={d.key} title={d.label}>{d.label}</Option>))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item name="states_id" label="View States">
              <Select
                mode="multiple"
                defaultValue={StaffStore.models.StaffUpdateData.states.map((s:any)=>s.state_id)}
                allowClear>
                <Option key="72beb2f8-b881-4035-9897-3aa04630cf4a" value="72beb2f8-b881-4035-9897-3aa04630cf4a" title="QLD">QLD</Option>
                <Option key="5c36f5d9-6dc6-4eae-93a6-5726c7a16d0c" value="5c36f5d9-6dc6-4eae-93a6-5726c7a16d0c" title="VIC">VIC</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item name="group_ids" label="Group">
              <Select
                mode="multiple"
                defaultValue={StaffStore.models.StaffUpdateData.groups}
                allowClear>
                {
                  StaffStore.SelectOptions.Group.map((d: { key: string; label: string; }) => (<Option key={d.key} value={d.key} title={d.label}>{d.label}</Option>))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item name="chart_template_id" label="Chart Template">
              <Select
                defaultValue={StaffStore.models.StaffUpdateData.chart_template_id}
              >
                {
                  StaffStore.SelectOptions.ChartTemplate.map((d: { key: string; label: string; }) => (<Option key={d.key} value={d.key} title={d.label}>{d.label}</Option>))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col offset={2} span={20}>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea defaultValue={StaffStore.models.StaffUpdateData.notes}/>
            </Form.Item>
          </Col>
        </Row>




      </Form>
    </Modal>
  )
};

export default Staff