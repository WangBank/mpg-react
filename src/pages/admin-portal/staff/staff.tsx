import { Table, Button, Space, Modal, Form, Input, Row, Col, Select, Alert,Popconfirm } from 'antd';
import React from 'react';
import { observer, inject } from "mobx-react";
import { StaffAddFormProps, StaffUpdateFormProps } from '../../../models/admin-portal/staff/StaffBaseModel';


interface IStaffProps {
  StaffStore?: any,
}
@inject("StaffStore")
@observer
class Staff extends React.Component<IStaffProps> {

  getStaffList = async () => {
    console.log(this.props.StaffStore.searchParams)
   await this.props.StaffStore.getStaffList();
  }

  addStaff = async () => {
    await this.props.StaffStore.GetAddStaffSelectInfo();
    this.props.StaffStore.models.showAddForm = true;
  }

  showSearchSection = ()=>{
    this.props.StaffStore.models.showSearch = true;
  }
  hiddenSearchSection= ()=>{
    this.props.StaffStore.models.showSearch = false;
  }
  clearSearchSection=()=>{
    this.props.StaffStore.clearSearch();
  }


  updateStaff = async (id: string) => {
    await this.props.StaffStore.GetStaffInfo(id);
  }

  deleteStaff = (id: string) => {
     this.props.StaffStore.DeleteStaff(id);
  }

  componentDidMount() {
    this.props.StaffStore.models.showSearch = false;
    this.props.StaffStore.clearSearch();
    this.getStaffList();
  }

  first_name_change(data:React.ChangeEvent<HTMLInputElement>){
    this.props.StaffStore.searchParams.first_name = data.target.value;
  }

  last_name_change(data:React.ChangeEvent<HTMLInputElement>){
    this.props.StaffStore.searchParams.last_name = data.target.value;
  }

  email_change(data:React.ChangeEvent<HTMLInputElement>){
    this.props.StaffStore.searchParams.email = data.target.value;
  }

  phone_change(data:React.ChangeEvent<HTMLInputElement>){
    this.props.StaffStore.searchParams.phone = data.target.value;
  }

  postcode_change(data:React.ChangeEvent<HTMLInputElement>){
    this.props.StaffStore.searchParams.postcode = data.target.value;
  }
  status_change(data:any){
    console.log(data)
    this.props.StaffStore.searchParams.status = data;
  }


  render() {

    const { StaffStore } = this.props;
    const { Option } = Select;

    return (
      <>
        {
          this.props.StaffStore.models.showSearch ?( 
          <>
        <Row gutter={16} style={{padding: '8px 0'}}>
          <Col span={8}>
              <Input addonBefore="First Name" onChange={(event)=>this.first_name_change(event)} defaultValue={this.props.StaffStore.searchParams.first_name}/>
          </Col>
          <Col span={8}>
            <Input addonBefore="Last Name"  onChange={(event)=>this.last_name_change(event)} defaultValue={this.props.StaffStore.searchParams.last_name}/>
            </Col>
            <Col span={8}>
            <Input addonBefore="Email"  onChange={(event)=>this.email_change(event)} defaultValue={this.props.StaffStore.searchParams.email}/>
            </Col>
        </Row>

        <Row gutter={16} style={{padding: '8px 0'}}>
          <Col span={8}>
          <Input addonBefore="Mobile Number" onChange={(event)=>this.phone_change(event)} defaultValue={this.props.StaffStore.searchParams.phone}/>
          </Col>
          <Col span={8}>
          <Input addonBefore="Postcode"  onChange={(event)=>this.postcode_change(event)} defaultValue={this.props.StaffStore.searchParams.postcode}/>
            </Col>
            <Col span={8}>
            <Select style={{width:"100%"}} placeholder="please select status" onChange={(event)=>this.status_change(event)} defaultValue={this.props.StaffStore.searchParams.status}>
              <Option  key="0" value="0" title="Inactive">Inactive</Option>
              <Option  key="1" value="1" title="Active">Active</Option>
            </Select>
            </Col>
        </Row>

        <Row gutter={24}>
            <Col offset={16} span={8} >
              <div style={{float:'right'}}>
              <Button type='primary' size="middle" onClick={this.getStaffList}>Search</Button>
              <Space/>
            <Button type='default' size="middle" onClick={this.clearSearchSection}>Clear Filter</Button>
            <Space/>
            <Button type='default' size="middle" onClick={this.hiddenSearchSection}>Cancel</Button>
              </div>
            
            </Col>
        </Row>

           

           
            </>
            ):''
        }
       
        <Space size="middle">

          <Button type='primary' size="middle" onClick={this.addStaff}>Add</Button>
          {
            this.props.StaffStore.models.showSearch?'':(      <Button type='default' size="middle" onClick={this.showSearchSection}>Search</Button>)
          }
        </Space>

        <Table
          rowKey='id'
          size="middle"
          pagination={{ current: StaffStore.searchParams.page, pageSize: StaffStore.searchParams.page_size, total: StaffStore.total }}
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
                  {/*eslint-disable-next-line*/}
                  <a href='#' onClick={() => this.updateStaff(record.id)}>Details</a>
                  <Popconfirm
                  title="Are you sure to delete this staff?"
                  onConfirm={() => this.deleteStaff(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                {/*eslint-disable-next-line*/}
                  <a href="#">Delete</a>
                </Popconfirm>
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
      </>
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


const StaffUpdateForm: React.FC<StaffUpdateFormProps> = ({
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
        initialValues={{
          first_name: StaffStore.models.StaffUpdateData.first_name,
          street: StaffStore.models.StaffUpdateData.street,
          last_name: StaffStore.models.StaffUpdateData.last_name,
          suburb: StaffStore.models.StaffUpdateData.suburb,
          email: StaffStore.models.StaffUpdateData.email,
          state_id: StaffStore.models.StaffUpdateData.state_id,
          phone: StaffStore.models.StaffUpdateData.phone,
          postcode: StaffStore.models.StaffUpdateData.postcode,
          status: '' + StaffStore.models.StaffUpdateData.status + '',
          states_id: StaffStore.models.StaffUpdateData.states.map((s: any) => s.state_id),
          group_ids: StaffStore.models.StaffUpdateData.groups,
          chart_template_id: StaffStore.models.StaffUpdateData.chart_template_id,
          notes: StaffStore.models.StaffUpdateData.notes,
          id: StaffStore.models.StaffUpdateData.id,
        }}
      >
        <Row gutter={16}>
          <Col offset={2} span={8}>

            <Form.Item
              name="id"
              hidden={true}
            >
              <Input />
            </Form.Item>
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
              <Select
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
              <Select
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
              <Select

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
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        {
          StaffStore.models.updateSuccess ? <Alert message="Update Staff Info Success" type="success" showIcon /> : ''
        }

        {
          StaffStore.models.UpdateStaffErrorMsg && StaffStore.models.UpdateStaffErrorMsg !== '' && !StaffStore.models.updateSuccess ? <Alert message={StaffStore.models.UpdateStaffErrorMsg} type="error" showIcon /> : ''
        }

      </Form>
    </Modal>
  )
};

export default Staff