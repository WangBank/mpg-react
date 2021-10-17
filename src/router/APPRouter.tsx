import { ReactNode } from "react";
import { RouteInfo_Dashboard,RouteInfo_Base,RouteInfo_Settings } from "../models/RouteConfig";
import Dashboard from "../pages/admin-portal/dashboard";
import Staff from "../pages/admin-portal/staff/staff";
import SupportItem from "../pages/admin-portal/support-items/support-item";
import Login from "../pages/login";


interface IRouter{
  title:string,
  path:string,
  key:string,
  component?:ReactNode,
  children?:IRouter[]
}

export const router:IRouter[]=[
  {
    path:RouteInfo_Settings.SupportItems,
    title:'support-items', 
    key:'support-items',
    component:<SupportItem></SupportItem>
  },
  {
    path:RouteInfo_Settings.Staffs,
    title:'staff', 
    key:'staff',
    component:<Staff></Staff>
  },
  {
    path:RouteInfo_Dashboard.Dashboard,
    title:'dashboard', 
    key:'dashboard',
    component:<Dashboard></Dashboard>
  }
]


export const unaurouter:IRouter[]=[
  {
    path:RouteInfo_Base.Login,
    title:'login',
    key:'login',
    component:<Login></Login>
  }
]
