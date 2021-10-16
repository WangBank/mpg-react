import StaffService from '../Service/admin-portal/staff/StaffService';
import SupportItemService from '../Service/admin-portal/support-items/support-item';
import LoginService from '../Service/audi/login-service';
import ServiceBase from '../utils/HttpClients';
import StaffStore from './admin-portal/staff/StaffStore';
import SupportItemStore from './admin-portal/support-items/SupportItemStore'
import LoginStore from './LoginStore';


export default class BaseStore {
  config;
  ServiceBase;
  SupportItemService;
  SupportItemStore;
  LoginService;
  LoginStore;
  StaffStore;
  StaffService;


  constructor(config:any) {
    this.config = config;
    this.ServiceBase = new ServiceBase(this.config.BaseAPIURL);
    this.LoginService = new LoginService(this);
    this.LoginStore = new LoginStore(this);
    this.SupportItemService = new SupportItemService(this);
    this.SupportItemStore = new SupportItemStore(this);
    this.StaffService = new StaffService(this);
    this.StaffStore = new StaffStore(this);
  }
}