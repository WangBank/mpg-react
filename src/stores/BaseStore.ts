import SupportItemService from '../Service/admin-portal/support-items/support-item';
import SupportItemStore from './admin-portal/support-items/SupportItemStore'


export default class BaseStore {
  SupportItemService;
  config;
  SupportItemStore;
  constructor(config:any) {
    this.config = config;
    this.SupportItemService = new SupportItemService(this);
    this.SupportItemStore = new SupportItemStore(this);
  }
}