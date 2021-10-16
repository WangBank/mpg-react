import  React,{Component} from "react";
import {router,unaurouter} from '../router/APPRouter';

import{
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import AdminLayout from "./layout";

class View extends Component{
  render(){
    return (
      <>
      <Router>
        
      <Switch>
        <Route path={'/'} exact>
          <Redirect to={'/admin/dashboard'}></Redirect>
        </Route>
        <Route path='/admin'>
        <AdminLayout>
          {
            router.map(r=>(<Route path={r.path} key={r.key}>{r.component}</Route>))
          }
        </AdminLayout>
        </Route>
        <Switch>
          {
            unaurouter.map(r=>(<Route path={r.path} key={r.key}>{r.component}</Route>))
          }
        </Switch>
        </Switch>
      </Router>
      

      
      </>
    )
  }
}

export default View