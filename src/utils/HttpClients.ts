
import fetch from 'axios';
import {BaseSettings, LocalStorageModel} from '../models/BaseModel'

export default class ServiceBase {
  baseURL;
  constructor(baseURL:string) {
    this.baseURL = baseURL;
  }

  generateStackTrace(funcName:string) {
    return { funcName, className: this.constructor.name };
  }

  get(url:string, params:any, config:any) {
    return fetch.get(url, this.getConfig(url, params, config))
      .then(
        res => res.data,
      )
      .catch(
        e => ServiceBase.handleError(this.baseURL, url, params, null, e, 'GET', config.stack),
      );
  }

  post(url:string, data:any, config:any) {
    return fetch.post(url, data, this.getConfig(url, null, config))
      .then(
        res => res.data,
      )
      .catch(
        e => ServiceBase.handleError(this.baseURL, url, null, data, e, 'POST', config.stack),
      );
  }

  put(url:string, data:any, config:any) {
    return fetch.put(url, data, this.getConfig(url, null, config))
      .then(
        res => res.data,
      )
      .catch(
        e => ServiceBase.handleError(this.baseURL, url, null, data, e, 'POST', config.stack),
      );
  }

  delete(url:string, params:any, config:any) {
    return fetch.delete(url, this.getConfig(url, params, config))
      .then(
        res => res.data,
      )
      .catch(
        e => ServiceBase.handleError(this.baseURL, url, params, {}, e, 'DELETE', config.stack),
      );
  }

  getConfig(url:string, params:any, config:any) {
    const innerConfig = config || {};
    let { baseURL } = this;
    if (innerConfig.baseURL) {
      ({ baseURL } = innerConfig);
    }
    var token = this.getToken();
   
    if(token){
      const headers =  {
        'Content-Type': 'application/json',
        Authorization: "Bearer " +token,}
      return {
        ...innerConfig, params, baseURL, headers,
      };
    }else{
      const headers =  {
        'Content-Type': 'application/json',
      }
      return {
        ...innerConfig, params, baseURL, headers,
      };
    }
   
   
  }

  static handleError(base:string, urlPart:string, refParams:any, data:any, e:any, method:string, stack:any) {
    const statusCode = (e.response && e.response.status) || 0;
    console.log(statusCode)
    const host = () => {
      try {
        const url = window.location.href;
        if(url) {
          const urlObj = new URL(window.location.href);
          const host = `${urlObj.protocol}//${urlObj.hostname}:${urlObj.port}`;
          return host
        }
      } catch (err) {
        return BaseSettings.CurrentUrl;
      }
    }
    if (parseInt(statusCode,10) === 401) {
      localStorage.setItem("token",'');
      localStorage.setItem("userName",'');
      localStorage.setItem("userId",'');
      localStorage.setItem("roleType",'-1');
      window.location.href = `${host()}/login`;
    }
    return Promise.reject(e);
  }

  getToken() {
    return localStorage.getItem(LocalStorageModel.Token);
  }

  setData(key:string,value:any) {
    return localStorage.setItem(key,value);
  }
}
