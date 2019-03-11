import React,{ Component } from "react";

import { connect } from "react-redux";
import { profileInfo } from "../../../redux/actions/user";
import TableComponent from "../../other/TableComponent";
import HelperLocalStorage from "../../../helpers/local-storage-helper";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {NotificationContainer} from 'react-notifications';
import uuidv1 from 'uuid/v1';
import UserService from "../../../services/user";


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


class UserListClass extends Component {

    constructor(props){
        
        super(props);

        this.userService = new UserService();
        this.__deleteUser = this.__deleteUser.bind(this);
        this.__loadUsers = this.__loadUsers.bind(this);

        this.state = {
            data : null,
            table : {
                heading : 'Users List', 
                className : 'customclass', 
                footer : 'Footer ', 
                noRecordFoundText : 'There are no records', 
                headers : { 
                    fields : [
                        {
                            title : 'Profile Pic',
                            data : 'profile_pic',
                            render : data => { return <img key={uuidv1()} width="125" src={data.profile_pic} alt="profile_pic" /> }
                        },
                        {
                            title : 'Name', 
                            data : 'name', 
                            sortable : false,
                            render : data => { return data.first_name+' '+data.last_name;  }, 
                        },
                        {
                            title : 'Gender',
                            data : 'gender',
                            sortable : false
                        },
                        {
                            title : 'Email',
                            data : 'email',
                            sortable : false
                        },
                        {
                            title : 'Mobile Number',
                            data : 'mobile_number',
                            sortable : false
                        },
                        {
                            title : 'Role',
                            data : 'role',
                            sortable : false,
                            render : data => { return data.role[0].name;  }, 
                        }
                    ],
                    rowActions : {
                        title : 'Actions',
                        actions : {
                            edit : {
                                path : data => { 
                                    return '/admin/user/edit/'+data.id 
                                },
                                show : true,
                                title : {
                                    class : 'btn-info',
                                    text : 'Edit'
                                }
                            },
                            delete : {
                                show : data => { 
                                
                                    if(data.role[0].slug === 'admin') {  
                                        return false 
                                    }
                                
                                    return true; 
                                
                                },
                                title : {
                                    class : 'btn-danger',
                                    text : 'Delete'
                                },
                                method : data => {
                                    return this.__confirmDelete(data);
                                
                                }
                            }
                        }
                    }
                }
            }
        }

        
    }

    __confirmDelete(data){

        const options = {
            title: 'Delete',
            message: 'Are you sure want to delete it?',
            childrenElement: () => <div />,
            customUI: ({ title, message, onClose }) => <div className="custom-ui"><h1>{title}</h1><p>{message}</p><button onClick={ () => onClose()  }>No</button><button onClick={ () => this.__deleteUser(data,onClose) }>Yes, Delete it!</button></div>,
            willUnmount: () => {}
        }
         
        confirmAlert(options);
    }
    

    __deleteUser(data,onClose){
        
        this.userService.delete(data.id)
            .then(response => {
                if(!response.ok){
                    this.userService.__handleError();
                    return false;
                }

                return response;
            }).then((response) => {
                if(response){
                    return response.json();
                }
                return false;
            }).then(response => {

                if(response.success === "true"){

                     let notification = {
                        message : response.message,
                        type : 'success',
                    }

                    this.userService.__notification(notification);

                    this.setState({
                        redirecToIndex : true,
                    }); 

                    this.__loadUsers();

                }

                onClose();

            });
    }

    componentDidMount(){
        this.__loadUsers();
    }

    __loadUsers(){
        
        this.userService.all()
            .then((response) => {
                if(!response.ok){
                    HelperLocalStorage.handle(response);
                    return false;
                }

                return response;
            }).then((response) => {
                if(response){
                    return response.json();
                }
                return false;
            }).then(data => {
                
                this.setState({data : data.data});
                return true;
                
            }).catch((error) => {
                alert('error');
                return false;
            });
    }

    render(){
        
        return (

            <div className="row">
                <NotificationContainer/>
                {
                    this.state.data ? <TableComponent key={uuidv1()} data={this.state.data} table={this.state.table} /> : "Loading"
                }
            </div>

        );
    }
}

const UserList = connect(mapStateToPros, mapDispatchToPros)(UserListClass);
export default UserList;