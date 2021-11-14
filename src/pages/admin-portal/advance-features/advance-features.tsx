import {  Button, message, Upload } from 'antd';
import React from 'react';
import { observer, inject } from "mobx-react";
import { UploadOutlined} from '@ant-design/icons';



interface IAdvanceFeatures {

}
@inject("StaffStore")
@observer
class AdvanceFeatures extends React.Component<IAdvanceFeatures> {


  componentDidMount() {
   
  }
  
  render() {
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info:any) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    return (
      <div>
         <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

      </div>
    );
  }

}






export default AdvanceFeatures