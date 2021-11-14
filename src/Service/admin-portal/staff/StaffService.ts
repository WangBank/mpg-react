import { StaffAddData, StaffSearchParams, StaffUpdateData } from '../../../models/admin-portal/staff/StaffBaseModel';
import ServiceBase from '../../../utils/HttpClients';
 
export default class StaffService extends ServiceBase{
  BaseStore;
  constructor(BaseStore:any) {
    super(BaseStore.config.BaseAPIURL);
    this.BaseStore = BaseStore;
  }

  getStaffList= (params:StaffSearchParams)=>this.get(`admin/staff/list?Page=${params.page}&PageSize=${params.page_size}&id=${params.id}&first_name=${params.first_name}&last_name=${params.last_name}&status=${params.status}&email=${params.email}&phone=${params.phone}&state_id=${params.state_id}&suburb=${params.suburb}&street=${params.street}&postcode=${params.postcode}`, '', { stack: this.generateStackTrace('getStaffList') });

  addStaff= (data:StaffAddData)=>this.post(`admin/staff/add`, data, { stack: this.generateStackTrace('addStaff') });

  updateStaff= (data:StaffUpdateData)=>this.put(`admin/staff/update`, data, { stack: this.generateStackTrace('updateStaff') });

  getStaffDetails= (id:string)=>this.get(`admin/staff/details?id=${id}`, '', { stack: this.generateStackTrace('getStaffDetails') });

  deleteStaff= (id:string)=>this.delete(`admin/staff/delete?id=${id}`, '', { stack: this.generateStackTrace('deleteStaff') });
}