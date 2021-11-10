import { StaffAddData } from '../../../models/admin-portal/staff/StaffBaseModel';
import ServiceBase from '../../../utils/HttpClients';
 
export default class StaffService extends ServiceBase{
  BaseStore;
  constructor(BaseStore:any) {
    super(BaseStore.config.BaseAPIURL);
    this.BaseStore = BaseStore;
  }

  getStaffList= (params:any)=>this.get(`admin/staff/list?Page=${params.page}&PageSize=${params.page_size}`, '', { stack: this.generateStackTrace('getStaffList') });

  addStaff= (data:StaffAddData)=>this.post(`admin/staff/add`, data, { stack: this.generateStackTrace('addStaff') });

  getStaffDetails= (id:string)=>this.get(`admin/staff/details?id=${id}`, '', { stack: this.generateStackTrace('getStaffDetails') });
}