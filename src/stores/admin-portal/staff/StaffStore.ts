import {observable,action,runInAction} from 'mobx'
import { message } from 'antd';
import BaseStore from '../../BaseStore';

export default class StaffStore{
  baseStore;
  constructor(rootSt:BaseStore) {
    this.baseStore = rootSt;
  }

  models = observable({
    StaffList: [],
    isLoading: false,
  });

  @observable page = 1;
  @observable page_size = 25;
  @observable total = 0;
  @observable error = '';
  @action
  getStaffList = (setcolumns:any) => {
    this.models.isLoading = true;
    const opt = {
      page: this.page,
      page_size: this.page_size,
    }
    this.baseStore.StaffService.getStaffList(opt).then((res:any)=>{
      this.models.isLoading = false;
      if(res.ok) {
        runInAction(() => {
          this.models.StaffList = res.data.data;
          this.total = res.data.total;
          if (setcolumns !== null) {
            if (res.data.data && res.data.data.length !== 0) {
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
    }).catch((res:any) => {
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
    this.getStaffList(null);
  }

}