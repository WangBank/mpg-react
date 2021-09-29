import ServiceBase from '../../../utils/HttpClients';
 
export default class SupportItemService extends ServiceBase{
  BaseStore;
  constructor(BaseStore:any) {
    super(BaseStore.config.BaseAPIURL);
    this.BaseStore = BaseStore;
  }

  getSupportItemList= (params:any)=>this.get(`admin/NDISSupportItem/List?Page=${params.page}&PageSize=${params.page_size}`, '', { stack: this.generateStackTrace('getSupportItemList') });
}