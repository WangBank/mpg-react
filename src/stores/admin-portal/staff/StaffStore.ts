import {observable,action,runInAction} from 'mobx'
import { message } from 'antd';
import BaseStore from '../../BaseStore';
import { DictionaryItemsType } from '../../../models/CommonModel';
import { SelectOptionsForStaff, StaffAddData, StaffSearchParams, StaffUpdateData } from '../../../models/admin-portal/staff/StaffBaseModel';



export default class StaffStore{
  baseStore;
  constructor(rootSt:BaseStore) {
    this.baseStore = rootSt;
  }

  models = observable({
    StaffList: [],
    isLoading: false,
    updateSuccess:false,
    showAddForm:false,
    showSearch:false,
    showUpdateForm:false,
    UpdateStaffErrorMsg:'',
    StaffUpdateData:{
      states:[]
    }
  });

  SelectOptions:SelectOptionsForStaff= observable({
    States: [],
    StaffStatus: [],
    Group: [],
    ChartTemplate: []
  });
  searchParams:StaffSearchParams= observable({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    state_id: '',
    suburb: '',
    street: '',
    postcode: '',
    page: 1,
    page_size:10,
  })

  @observable total = 0;
  @observable error = '';
  @action
  getStaffList = async () => {
    this.models.isLoading = true;
    
    await this.baseStore.StaffService.getStaffList(this.searchParams).then((res:any)=>{
    
      if(res.ok) {
        runInAction(() => {
          this.models.isLoading = false;
          this.models.StaffList = res.data.data;
          this.total = res.data.total;

        
        });
      }
      else {
        message.error(res.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
          this.error = res.errors;
        });
      }
    }).catch((res:any) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
            this.error = res.response.data.errors;  
        });
      }
    }).finally(() => {
      runInAction(()=>{
        this.models.isLoading = false;
      })
    
    });
  }

  @action
  updatePage = (page:number) => {
    this.searchParams.page = page;
    this.getStaffList();
  }

  @action
  clearSearch = ()=>{
    this.searchParams = {
      id: '',
      first_name: '',
      last_name: '',
      email:  '',
      phone:  '',
      state_id:  '',
      suburb:  '',
      street:  '',
      postcode:  '',
      page:1,
      page_size:10,
    }
    this.getStaffList();
  }


  @action
  GetAddStaffSelectInfo = async ()=>{
   runInAction(() => {
      this.models.isLoading = true;
    });
    this.SelectOptions = {
      States: [],
      StaffStatus: [],
      Group: [],
      ChartTemplate: []
    }
    await this.baseStore.CommonService.getDictionaryItems({type:DictionaryItemsType.State,id:''}).then((res:any)=>{
     
      if(res.ok) {
        runInAction(() => {
          this.models.isLoading = false;
          let resultdata = res.data
          // eslint-disable-next-line
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
          this.models.isLoading = false;
          this.error = res.errors;
        });
      }
    }).catch((res:any) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
            this.error = res.response.data.errors;  
        });
      }

    }).finally(() => {
      runInAction(()=>{
        this.models.isLoading = false;
      })
    });
    
    await this.baseStore.CommonService.getDictionaryItems({type:DictionaryItemsType.Group,id:''}).then((res:any)=>{

      if(res.ok) {
        runInAction(() => {
          this.models.isLoading = false;
          let resultdata = res.data
          // eslint-disable-next-line
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
          this.models.isLoading = false;
          this.error = res.errors;
        });
      }
    }).catch((res:any) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
            this.error = res.response.data.errors;  
        });
      }
    }).finally(() => {
      runInAction(()=>{
        this.models.isLoading = false;
      })

    });

    await this.baseStore.CommonService.getDictionaryItems({type:DictionaryItemsType.StaffStatusType,id:''}).then((res:any)=>{
   
      if(res.ok) {
        runInAction(() => {
          this.models.isLoading = false;
          let resultdata = res.data
          // eslint-disable-next-line
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
          this.models.isLoading = false;
          this.error = res.errors;
        });
      }
    }).catch((res:any) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
            this.error = res.response.data.errors;  
        });
      }

    }).finally(() => {
      runInAction(()=>{
        this.models.isLoading = false;
      })
    });


    await this.baseStore.CommonService.getDictionaryItems({type:DictionaryItemsType.ChartTemplate,id:''}).then((res:any)=>{
      if(res.ok) {
        runInAction(() => {
          this.models.isLoading = false;
          let resultdata = res.data
          // eslint-disable-next-line
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
          this.models.isLoading = false;
          this.error = res.errors;
        });
      }
    }).catch((res:any) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
            this.error = res.response.data.errors;  
        });
      }

    }).finally(() => {
      runInAction(()=>{
        this.models.isLoading = false;
      })
    });
  }

  @action
  GetStaffInfo = async (id:string) =>{
    await this.GetAddStaffSelectInfo();

    await this.baseStore.StaffService.getStaffDetails(id).then((res:any)=>{
   
      if(res.ok) {
        runInAction(async () => {
    
          this.models.StaffUpdateData = res.data;
          console.log(res.data)
          this.models.showUpdateForm = true;
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

    }).finally(() => {
    });
  }



  @action
  Cancel=()=>{
    runInAction(()=>{
      this.models.showAddForm = false;
      this.models.showUpdateForm = false;
      this.models.updateSuccess = false;
      this.models.UpdateStaffErrorMsg = '';
    })
  }

  @action
  Create= async (staffCreateInfo:StaffAddData)=>{
    
    console.log('staffCreateInfo',staffCreateInfo)
    runInAction(() => {
      this.models.isLoading = true;
    });

    await this.baseStore.StaffService.addStaff(staffCreateInfo).then((res:any)=>{
   
      if(res.ok) {
        runInAction(async () => {
          this.models.isLoading = false;
          this.models.showAddForm = false;
          await this.getStaffList();
        });
      }
      else {
        message.error(res.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
          this.error = res.errors;
        });
      }
    }).catch((res:any) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
            this.error = res.response.data.errors;  
        });
      }

    }).finally(() => {
      runInAction(()=>{
        this.models.isLoading = false;
      })
    });

  }

  @action
  Update= async (staffUpdateInfo:StaffUpdateData)=>{
    
    console.log('staffUpdateInfo',staffUpdateInfo)
    runInAction(() => {
      this.models.isLoading = true;
    });

    await this.baseStore.StaffService.updateStaff(staffUpdateInfo).then((res:any)=>{
   
      if(res.ok) {
        runInAction(async () => {
          this.models.isLoading = false;
          this.models.updateSuccess = true;
          this.getStaffList();
        });
      }
      else {
       
        runInAction(() => {
          this.models.isLoading = false;
        
          this.models.UpdateStaffErrorMsg = res.errors[0].message
        });
      }
    }).catch((res:any) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        runInAction(() => {
          this.models.isLoading = false;
            this.models.UpdateStaffErrorMsg = res.errors[0].message
        });
      }

    }).finally(() => {
      runInAction(()=>{
        this.models.isLoading = false;
      })
    });

  }

  @action
  DeleteStaff = (staffid:string)=>{
    
    runInAction(() => {
      this.models.isLoading = true;
    });

     this.baseStore.StaffService.deleteStaff(staffid).then((res:any)=>{
   
      if(res.ok) {
        runInAction(async () => {
          this.models.isLoading = false;
          this.getStaffList();
        });
      }
      else {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
        });
      }
    }).catch((res:any) => {
      if(res.response&&res.response.data&&res.response.data.errors) {
        message.error(res.response.data.errors[0].message);
        runInAction(() => {
          this.models.isLoading = false;
        });
      }

    }).finally(() => {
      runInAction(()=>{
        this.models.isLoading = false;
      })
    });

  }
}