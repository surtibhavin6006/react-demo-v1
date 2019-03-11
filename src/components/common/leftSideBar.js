import React,{ Component } from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";


const mapStateToPros = (state) => {
    return {
        user : state.user
    }
};

class LeftSideBarClass extends Component {

    render(){

        let role = '';

        if(this.props.user.profile.role !== undefined){
            role = this.props.user.profile.role[0].slug
        }

        if(role === 'admin'){
            
            return (

                <div className="page-sidebar" id="sidebar">
    
                    <div className="sidebar-header-wrapper">
                        <input type="text" className="searchinput"/>
                        <i className="searchicon fa fa-search"></i>
                        <div className="searchhelper">Search Reports, Charts, Emails or Notifications</div>
                    </div>
    
                    <ul className="nav sidebar-menu">
    
                        <li className={ (this.props.location && this.props.location.pathname === '/admin/dashboard') || (!this.props.location) ? 'active' : '' }>
                            <NavLink to="/admin/dashboard">
                                <i className="menu-icon glyphicon glyphicon-home"></i>
                                <span className="menu-text"> Dashboard </span>
                            </NavLink>
                        </li>
    
                        <li className={ (this.props.location && this.props.location.pathname === '/admin/users') ? 'active' : '' } >
                            <NavLink to="/admin/users">
                                <i className="menu-icon glyphicon glyphicon-user"></i>
                                <span className="menu-text"> Users </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/admin/loan/types" >
                                <i className="menu-icon glyphicon glyphicon-certificate"></i>
                                <span className="menu-text"> Loan Type</span>
                            </NavLink>
                        </li>

    
                        <li>
                            <NavLink to="/logout" >
                                <i className="menu-icon glyphicon glyphicon-log-out"></i>
                                <span className="menu-text"> Logout </span>
                            </NavLink>
                        </li>

                        
                        
    
                    </ul>
    
    
                </div>
    
            );

        } else {
            
            return (

                <div className="page-sidebar" id="sidebar">
    
                    <div className="sidebar-header-wrapper">
                        <input type="text" className="searchinput"/>
                        <i className="searchicon fa fa-search"></i>
                        <div className="searchhelper">Search Reports, Charts, Emails or Notifications</div>
                    </div>
    
                    <ul className="nav sidebar-menu">
    
                        <li className={ (this.props.location && this.props.location.pathname === '/dashboard') || (!this.props.location) ? 'active' : '' }>
                            <NavLink to="/dashboard">
                                <i className="menu-icon glyphicon glyphicon-home"></i>
                                <span className="menu-text"> Dashboard </span>
                            </NavLink>
                        </li>
    
                        <li>
                            <NavLink to="/logout" >
                                <i className="menu-icon glyphicon glyphicon-log-out"></i>
                                <span className="menu-text"> Logout </span>
                            </NavLink>
                        </li>
    
                    </ul>
    
    
                </div>
    
            );
        }

        
    }
}

const LeftSideBar = connect(mapStateToPros, null)(LeftSideBarClass);
export default LeftSideBar;