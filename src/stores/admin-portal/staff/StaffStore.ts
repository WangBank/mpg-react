import {observable,action,runInAction} from 'mobx'
import { message } from 'antd';
import BaseStore from '../../BaseStore';
import { DictionaryItemsType } from '../../../models/CommonModel';

interface SelectOption{
  key:string,
  label:string,
}

interface SelectOptionsForStaff{
  States:SelectOption[],
  StaffStatus:SelectOption[],
  Group:SelectOption[],
  ChartTemplate:SelectOption[],
}

export default class StaffStore{
  baseStore;
  constructor(rootSt:BaseStore) {
    this.baseStore = rootSt;
  }

  models = observable({
    StaffList: [],
    isLoading: false,
    showAddForm:false,
  });

  @observable SelectOptions:SelectOptionsForStaff={
    States: [],
    StaffStatus: [],
    Group: [],
    ChartTemplate: []
  };


  @observable page = 1;
  @observable page_size = 25;
  @observable total = 0;
  @observable error = '';
  @action
  getStaffList = () => {
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
    this.getStaffList();
  }


  @action
  GetAddStaffSelectInfo =()=>{
    this.models.isLoading = true;
    this.SelectOptions = {
      States: [],
      StaffStatus: [],
      Group: [],
      ChartTemplate: []
    }
    this.baseStore.CommonService.getDictionaryItems({type:DictionaryItemsType.State,id:''}).then((res:any)=>{
      this.models.isLoading = false;
      if(res.ok) {
        runInAction(() => {
          let resultdata = res.data
          resultdata.map((element:any) => {
            this.SelectOptions.States.push({
              label:element.full_name,
              key:element.id
            })
          });

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
    
    this.baseStore.CommonService.getDictionaryItems({type:DictionaryItemsType.Group,id:''}).then((res:any)=>{
      this.models.isLoading = false;
      if(res.ok) {
        runInAction(() => {
          let resultdata = res.data
          resultdata.map((element:any) => {
            this.SelectOptions.Group.push({
              label:element.full_name,
              key:element.id
            })
          });

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

    this.baseStore.CommonService.getDictionaryItems({type:DictionaryItemsType.StaffStatusType,id:''}).then((res:any)=>{
      this.models.isLoading = false;
      if(res.ok) {
        runInAction(() => {
          let resultdata = res.data
          resultdata.map((element:any) => {
            this.SelectOptions.StaffStatus.push({
              label:element.full_name,
              key:element.id
            })
          });

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


    this.baseStore.CommonService.getDictionaryItems({type:DictionaryItemsType.ChartTemplate,id:''}).then((res:any)=>{
      this.models.isLoading = false;
      if(res.ok) {
        runInAction(() => {
          let resultdata = res.data
          resultdata.map((element:any) => {
            this.SelectOptions.ChartTemplate.push({
              label:element.full_name,
              key:element.id
            })
          });

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
  Cancel=()=>{
    this.models.showAddForm = false;
  }

  @action
  Create=(staffCreateInfo:any)=>{
    console.log('staffCreateInfo',staffCreateInfo)
  }

}