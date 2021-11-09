import ServiceBase from '../utils/HttpClients';
 
export default class CommonService extends ServiceBase{
  BaseStore;
  constructor(BaseStore:any) {
    super(BaseStore.config.BaseAPIURL);
    this.BaseStore = BaseStore;
  }
  getDictionaryItems= (data:any)=>this.get(`service/common/GetDictionaryItems?dictionary=${data.type}&id=${data.id}`,'', { stack: this.generateStackTrace('getDictionaries') });
}