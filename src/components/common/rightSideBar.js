import React,{ Component } from "react";
import { Switch,Route } from "react-router-dom";
import BreadCrumbs from "./breadcrumbs";
import Dashboard from "./dashboard";
import Logout from "../Auth/logout";
import UserIndex from "../Admin/User/index";
import LoanIndex from "../Admin/Loan/Type";

class RightSideBar extends Component {

    render(){

        return (

            <div className="page-content">

                <BreadCrumbs/>

                <div className="page-header position-relative">
                    <div className="header-title">
                        <h1>
                            Dashboard
                        </h1>
                    </div>
                    <div className="header-buttons">
                        <a className="sidebar-toggler" href="/admin">
                            <i className="fa fa-arrows-h"></i>
                        </a>
                        <a className="refresh" id="refresh-toggler" href="/admin">
                            <i className="glyphicon glyphicon-refresh"></i>
                        </a>
                        <a className="fullscreen" id="fullscreen-toggler" href="/admin">
                            <i className="glyphicon glyphicon-fullscreen"></i>
                        </a>
                    </div>
                </div>

                <div className="page-body">
                    <Switch>
                        <Route exact path="/admin/" component={Dashboard}/>
                        <Route exact path="/admin/dashboard" component={Dashboard}/>
                        
                        <Route path="/admin/users" component={UserIndex}/>
                        <Route path="/admin/user" component={UserIndex}/>

                        <Route path="/admin/loan/types" component={LoanIndex}/>
                        
                        <Route exact path="/logout" component={Logout}/>
                    </Switch>
                </div>
            </div>
        );
    }
}


export default RightSideBar;