import { ReactNode } from "react";
import Dashboard from "../pages/admin-portal/dashboard";
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
    path:'/admin/support-items',
    title:'support-items', 
    key:'support-items',
    component:<SupportItem></SupportItem>
  },
  {
    path:'/admin/dashboard',
    title:'dashboard', 
    key:'dashboard',
    component:<Dashboard></Dashboard>
  }
]


export const unaurouter:IRouter[]=[
  {
    path:'/login',
    title:'login',
    key:'login',
    component:<Login></Login>
  }
]
