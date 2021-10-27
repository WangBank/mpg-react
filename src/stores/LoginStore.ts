import {observable,action,runInAction} from 'mobx'
import { message } from 'antd';
import BaseStore from './BaseStore';
import { BaseSettings, LocalStorageModel } from '../models/BaseModel';

export default class LoginStore{
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
  @action
  signin = () => {
    this.models.isLoading = true;
    const opt = {
      username: this.username,
      password: this.password,
    }
    this.baseStore.LoginService.signin(opt).then((res)=>{
      this.models.isLoading = false;
      if(res.ok) {
        runInAction(() => {
          if(res.ok){
            this.models.userinfo = res.data.user_info;
            this.baseStore.ServiceBase.setData(LocalStorageModel.Token,res.data.access_token)
            this.baseStore.ServiceBase.setData(LocalStorageModel.UserName,res.data.user_info.display_name)
            window.location.href='/'
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
  active = ()=>{
    this.models.isLoading = true;
    this.baseStore.LoginService.active({}).then((res)=>{
      this.models.isLoading = false;
      if(!res.ok) {
        runInAction(() => {
            localStorage.clear()
            window.location.href = `${BaseSettings.CurrentUrl}/login`;
        });
      }
      else {
      }
    }).catch((res) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
            this.error = res.response.data.errors;  
            localStorage.clear()
            window.location.href = `${BaseSettings.CurrentUrl}/login`;
        });
      }
      this.models.isLoading = false;
    }).finally(() => {
      this.models.isLoading = false;
    });
  }
}