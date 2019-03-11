import React,{ Component } from "react";

class BreadCrumbs extends Component {


    render(){


        return (

            <div className="page-breadcrumbs">
                <ul className="breadcrumb">
                    <li>
                        <i className="fa fa-home"></i>
                        <a href="/admin">Home</a>
                    </li>
                    <li className="active">Dashboard</li>
                </ul>
            </div>

        );
    }
}

export default BreadCrumbs;