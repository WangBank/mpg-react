import {observable,action,runInAction} from 'mobx'
import { message } from 'antd';
import BaseStore from './BaseStore';

export default class SupportItemStore{
  baseStore;
  constructor(rootSt:BaseStore) {
    this.baseStore = rootSt;
  }

  models = observable({
    userinfo:null,
    isLoading:false,
  });

  @observable username = '';
  @observable password = '';
  @observable error = [];
  @observable is_remember = false;
  @action
  signin = () => {
    this.models.isLoading = true;
    const opt = {
      username: this.username,
      password: this.password,
      is_remember:this.is_remember
    }
    this.baseStore.SupportItemService.getSupportItemList(opt).then((res)=>{
      this.models.isLoading = false;
      if(res.ok) {
        runInAction(() => {
          this.models.userinfo = res.data;
          if(res.ok){
            
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


}