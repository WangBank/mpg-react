import ServiceBase from '../../../utils/HttpClients';
 
export default class StaffService extends ServiceBase{
  BaseStore;
  constructor(BaseStore:any) {
    super(BaseStore.config.BaseAPIURL);
    this.BaseStore = BaseStore;
  }

  getStaffList= (params:any)=>this.get(`admin/NDISStaff/List?Page=${params.page}&PageSize=${params.page_size}`, '', { stack: this.generateStackTrace('getStaffList') });
}