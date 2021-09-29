import {observable,makeAutoObservable,action,runInAction} from 'mobx'
import { message } from 'antd';
import BaseStore from '../../BaseStore';

export default class SupportItemStore{
  baseStore;
  constructor(rootSt:BaseStore) {
    this.baseStore = rootSt;
  }

  models = observable({
    supportItemList: [],
    isLoading: false,
  });

  @observable page = 1;
  @observable page_size = 25;
  @observable total = 0;
  @observable error = '';
  @action
  getSupportItemList = (setcolumns:any) => {
    this.models.isLoading = true;
    const opt = {
      page: this.page,
      page_size: this.page_size,
    }
    this.baseStore.SupportItemService.getSupportItemList(opt).then((res)=>{
      this.models.isLoading = false;
      if(res.ok) {
        runInAction(() => {
          this.models.supportItemList = res.data.data;
          this.total = res.data.total;
          if (setcolumns != null) {
            if (res.data.data && res.data.data.length != 0) {
              let columndata = res.data.data[0]
              
              setcolumns(res.data.data);
            }
 
          }
         
        });
      }
      else {
        message.error(res.errors[0].message);
        runInAction(() => {
          this.error = res.errors;
        });
      }
    }).catch((res) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
            this.error = res.response.data.errors;  
        });
      }
      this.models.isLoading = false;
    }).finally(() => {
      this.models.isLoading = false;
    });
  }

  @action
  updatePage = (page:number) => {
    this.page = page;
    this.getSupportItemList(null);
  }

}