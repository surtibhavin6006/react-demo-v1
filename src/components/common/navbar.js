import React,{ Component } from "react";

class NavBar extends Component {


    render(){


        return (

            <div className="navbar">
                <div className="navbar-inner">
                    <div className="navbar-container">

                        <div className="navbar-header pull-left">
                            <a href="/admin" className="navbar-brand">
                                <small>
                                    <img src="/assets/img/logo.png" alt=""/>
                                </small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default NavBar;