
import fetch from 'axios';

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
    const headers =  {
        'Content-Type': 'application/json',
        Authorization: "Bearer " +token,}
    return {
      ...innerConfig, params, baseURL, headers,
    };
  }

  static handleError(base:string, urlPart:string, refParams:any, data:any, e:any, method:string, stack:any) {
    const statusCode = (e.response && e.response.status) || 0;
    const host = () => {
      try {
        const url = window.location.href;
        if(url) {
          const urlObj = new URL(window.location.href);
          const host = `${urlObj.protocol}//${urlObj.hostname}:${urlObj.port}`;
          return host
        }
      } catch (err) {
        return "http://localhost:3000";
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
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImZmMmM0NjQ2LTlhYjgtNDljOC05Yjg1LWZlYzY0OTI1NzQ2MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ3enRlc3QiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ3enRlc3RAMTIzLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJ3eiB0ZXN0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2MzM1MzEwMzQsImlzcyI6Im1hcGxlcGxhbi5jb20uYXUiLCJhdWQiOiJtYXBsZXBsYW4uY29tLmF1In0.yjIRR-JeeYBi5dRJMS332R9obE55cgFSFJLWWvhBqH8'
    //return localStorage.getItem("token");
  }
}
