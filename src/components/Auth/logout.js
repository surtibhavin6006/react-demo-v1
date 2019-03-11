import React,{ Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth";
import HelperLocalStorage from "../../helpers/local-storage-helper";

import { connect } from "react-redux";
import { profileInfo } from "../../redux/actions/user";

const mapDispatchToPros = (dispatch) => {
    return {
        setProfileInfo : (user) => dispatch(profileInfo(user))
    };
};

class LogoutClass extends Component {

    constructor(props){

        super(props);

        this.__logout = this.__logout.bind(this);

        this.authService = new AuthService();

        this.state = {
            isLogOut : false
        }
    }

    __logout(){

        if(this.state.isLogOut === false){
            
            this.authService.logout()
            .then((response) => {
                if(!response.ok){
                    return false;
                }

                HelperLocalStorage.deleteLoginInfo();

                this.setState({isLogOut : true})

                this.props.setProfileInfo({});

                return response;
            });
        }
        
    }

    render(){

        this.__logout();

        if(this.state.isLogOut === true){
           return <Redirect to="/login" />
        }

        return (
            <div>Loading...</div>
        );
    }
}

const Logout = connect(null, mapDispatchToPros)(LogoutClass);
export default Logout;