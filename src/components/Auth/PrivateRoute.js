import React,{ Component } from "react";
import { Route,Redirect } from "react-router-dom";
import HelperLocalStorage from "../../helpers/local-storage-helper";

import { connect } from "react-redux";
import { profileInfo } from "../../redux/actions/user";

import AuthService from "../../services/auth";
import Loader from "../other/Loader";

const mapDispatchToPros = (dispatch) => {
    return {
        setProfileInfo : (user) => dispatch(profileInfo(user))
    };
};

const mapStateToPros = (state) => {
    return {
        user : state.user
    }
};

class PrivateRouteClass extends Component {

    constructor(props){
        super(props);

        this.state = {
            isAuthenticated : this.props.user.profile && this.props.user.profile.isAuthenticated === true ? true : HelperLocalStorage.getLoginInfo() ? true : false,
            loading : true
        }

        this.authService = new AuthService();
    }

    componentDidMount(){
        this.__getUserInfo();
    }

    /* shouldComponentUpdate(nextProps){
        if(nextProps.location.pathname !== this.props.location.pathname){
            return true;
        }
        return false;
    } */

    /* componentDidMount(){

        let userData = HelperLocalStorage.getLoginInfo();
        if(userData && userData.token){

            if(this.props.user.profile && Object.keys(this.props.user.profile).length <= 0){
                
                this.__getUserInfo();                
            }
        }
        
    } */

    /* componentDidUpdate(){
        if(this.props.user.profile.isAuthenticated !== this.state.isAuthenticated){
            this.setState({isAuthenticated : this.props.user.profile.isAuthenticated });
        }
    } */

    
    __getUserInfo(){

        if(this.state.isAuthenticated && this.props.user.profile && Object.keys(this.props.user.profile).length <= 0){
            
            this.authService.me()
                .then((response) => {

                    if(!response.ok){
                        
                        this.authService.__handleError(response);
        
                        return false;
                    }
        
                    return response;
        
                    
                }).then((response) => {
                    
                    if(response){
                        return response.json();
                    }
        
                    return false;
        
                }).then((data) => {
        
                    if(data.success !== undefined){
                        data.data['isAuthenticated'] = true;
                        this.props.setProfileInfo(data.data);
                        this.setState({loading:false});
                        return true;
                    }
        
                    return false;
        
                });
                            
        }
        
    }

    render(){
        const {component: Component,...rest} = this.props;

        const {loading,isAuthenticated} = this.state;


        return (
            <div className="privateRoute">
                { loading ? <Loader/> : '' }
                {<Route {...rest} render={(props) => (
                    isAuthenticated === true
                        ? <Component {...props} />
                        : <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                )} />}
            </div>

        );
    }
}

const PrivateRoute = connect(mapStateToPros, mapDispatchToPros)(PrivateRouteClass);
export default PrivateRoute;