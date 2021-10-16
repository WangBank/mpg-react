import ServiceBase from '../../utils/HttpClients';
 
export default class LoginService extends ServiceBase{
  BaseStore;
  constructor(BaseStore:any) {
    super(BaseStore.config.BaseAPIURL);
    this.BaseStore = BaseStore;
  }

  signin= (data:any)=>this.post(`Admin/Signin/SigninInternal?internalkey=73660d3c-690e-4373-b5a4-a19b266b641b`,data, { stack: this.generateStackTrace('signin') });
}