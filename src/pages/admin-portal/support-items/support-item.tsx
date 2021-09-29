import { Table, Button, Space } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { observer, inject } from "mobx-react";
import moment from "moment";

interface ISupportItemProps{
  SupportItemStore?: any,
}

@inject("SupportItemStore")
@observer
class SupportItem extends React.Component<ISupportItemProps> {
  getSupportItemList = () => {
    this.props.SupportItemStore.getSupportItemList();
    console.log(this.props.SupportItemStore.models.supportItemList[0].state_price_list)
    if (this.props.SupportItemStore.models.supportItemList && this.props.SupportItemStore.models.supportItemList.length != 0) {
      this.props.SupportItemStore.models.supportItemList[0].state_price_list.forEach((element:any) => {
        this.columns.push({
          title: element.price_guide_short_name,
          dataIndex: element.price_guide_short_name,
          key:element.price_guide_short_name,
        })
      });
    }
  }

  constructor(props: any) {
    super(props)
  }
  columns = [
    {
      title: 'Support Area',
      dataIndex: 'support_area_name',
      key: 'support_area',
    },
    {
      title: 'Support Item Number',
      dataIndex: 'support_item_number',
      key: 'support_item_number',
    },
    {
      title: 'Support Item Name',
      dataIndex: 'support_item',
      key: 'support_item_name',
    },
    {
      title: 'Measure',
      dataIndex: 'unit_of_measure_name',
      key: 'measure',
    },
    {
      title: 'Quote',
      dataIndex: 'quote_name',
      key: 'quote',
    },
    {
      title: 'Valid Start Date',
      dataIndex: 'effective_start_date',
      key: 'effective_start_date',
    },
    {
      title: 'Valid End Date',
      dataIndex: 'effective_start_date',
      key: 'effective_end_date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record:any) => (
        <Space size="middle">
           {/* <Button onClick={() => history.push(`/enquiryDetail/${record.id}`)} style={{marginRight: '10px'}}>Edit</Button> */}
        
        </Space>
      ),
    }
  ];
  render() {
   
    const { SupportItemStore } = this.props;

    return (
      <div>
        <Button onClick={this.getSupportItemList}>Search</Button>
        <Table columns={this.columns}
            rowKey='enquiryId'
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