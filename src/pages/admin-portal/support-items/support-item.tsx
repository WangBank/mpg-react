import { Table, Button, Space } from 'antd';
import React from 'react';
import { observer, inject } from "mobx-react";


interface ISupportItemProps{
  SupportItemStore?: any,
}
let columns:any[] =[]
@inject("SupportItemStore")
@observer
class SupportItem extends React.Component<ISupportItemProps> {
  setColumns(activecolumns:any=null) {
    columns= []
     columns.push({
      title: 'Support Area',
      dataIndex: 'support_area_name',
      key: 'support_area_name',
    })
    columns.push({
      title: 'Support Item Number',
      dataIndex: 'support_item_number',
      key: 'support_item_number',
    })
    columns.push({
      title: 'Support Item Name',
      dataIndex: 'support_item',
      key: 'support_item',
    })
    columns.push({
      title: 'Measure',
      dataIndex: 'unit_of_measure_name',
      key: 'unit_of_measure_name',
    })
    columns.push({
      title: 'Quote',
      dataIndex: 'quote_name',
      key: 'quote_name',
    })
    if (activecolumns !== null) {
      activecolumns[0].state_price_list.forEach((element: any) => {
        columns.push({
          title: element.price_guide_short_name,
          dataIndex: 'state_price_list',
          key: element.price_guide_short_name,
          width:10,
          render:
            (prices: any[]) => {
            let nowprice = prices.filter(p => p.price_guide_short_name === element.price_guide_short_name)[0];
             return <span key={nowprice.price_guide_effective_id}>{nowprice.price==null?nowprice.price_string:nowprice.price}</span>
            }
        })
      });
    }

    columns.push({
      title: 'Valid Start Date',
      dataIndex: 'effective_start_date',
      key: 'effective_start_date',
    })
    columns.push(
    {
      title: 'Valid End Date',
      dataIndex: 'effective_start_date',
      key: 'effective_end_date',
    })
      
    columns.push( {
      title: 'Action',
      key: 'action',
      render: (record:any) => (
        <Space size="middle">
          {/* <Button onClick={() => history.push(`/SupportItemDetail/${record.id}`)} style={{marginRight: '10px'}}>Detail</Button> */}
          <a href="##" >Detail</a> 
        </Space>
      )
    })
  }
  getSupportItemList = () => {
    this.props.SupportItemStore.getSupportItemList(this.setColumns);
  }

  componentDidMount(){
    this.getSupportItemList();
  }

  render() {
   
    const { SupportItemStore } = this.props;

    return (
      <div>
        <Button type='primary' onClick={this.getSupportItemList}>Search</Button>
        <Table columns={columns}
            rowKey='price_guide_effective_id'
            size="middle"
            pagination={{current: SupportItemStore.page, pageSize: SupportItemStore.page_size, total: SupportItemStore.total}}
            dataSource={SupportItemStore.models.supportItemList}
            loading={SupportItemStore.models.isLoading}
            rowClassName={(record, index) => {
              let className = 'light-row';
              if (index % 2 === 1) className = 'dark-row';
              return className;
            }}
            onChange={pagination => {
              SupportItemStore.updatePage(pagination.current)
            }}
          />
      </div>
    );
  }
}

export default SupportItem