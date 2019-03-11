import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserService from "../../../services/user";
import Validation from "../../../validation/Validation";
import {NotificationContainer} from 'react-notifications';
import ErrorMessage from "../../validation/ErrorMessage";
import FileInputComponent from "../../other/FileInputComponent";

const mapStateToPros = (state) => {
    return {
        user : state.user
    }
};

class UserEditClass extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            /**
             * defining fields
             */
            fields : {
                id : props.match.params ? props.match.params.id : '',
                first_name : '',
                last_name : '',
                address1 : '',
                address2 : '',
                zipcode : '',
                gender : '',
                profile_pic : ''
            },
            /**
             * defining validation
             */
            validation : {
                /**
                 * defining validation rule
                 */
                rules : {
                    first_name : ['required'],
                    last_name : ['required'],
                    address1 : ['required'],
                    zipcode : ['required','numeric'],
                    gender : ['required'],
                    profile_pic : {
                        required : true,
                        file : {
                            type : ['png']
                        }
                    }
                },
                /**
                 * defining validation messages
                 */
                messages : {
                    first_name : {
                        required : 'Please enter first name'
                    },
                    last_name : {
                        required : 'Please enter last name'
                    },
                    address1 : {
                        required : 'Please enter address1'
                    },
                    zipcode : {
                        required : 'Please enter zipcode',
                        numeric : 'Zipcode must be numeric'
                    },
                    gender : {
                        required : 'Please select gender'
                    },
                    profile_pic : {
                        required : 'Please choose profile pic',
                        file : {
                            type : ' File must be type of jpg,jpeg,png'
                        }
                    }
                },
                /**
                 * all fields error messages will be added here
                 */
                errMsgs : {}
            },
            redirecToIndex : false,
            /**
             * setting up call back function for file upload
             */
            fileUpload : {
                callback : (files) => {
                    this.__handleFileEvent(files)
                },
                files : null,
            }
        }

        /**
         * binding methods
         */
        this.__handleSubmit = this.__handleSubmit.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
        this.__handleFileEvent = this.__handleFileEvent.bind(this);
        this.__getData = this.__getData.bind(this);

        /**
         * defining services
         */
        this.userService = new UserService();
    }

    componentDidMount()
    {
        /**
         * Calling function to get data
         */
        this.__getData();
    }

    /**
     * Api to get data
     */
    __getData()
    {

        let {fields} = this.state;

        if(fields.id){

            this.userService.getById(fields.id)
                .then(response => {

                    if(!response.ok){

                        this.userService.__handleError(response);
                        return false;

                    }
    
                    return response;

                }).then((response) => {

                    if(response){
                        
                        return response.json();
                    }

                    return false;

                }).then((data) => {
    
                    if(data.success === "true" || data.success === true){
                        
                        let {fields} = this.state;
                        fields['id'] = data.data.id;
                        fields['first_name'] = data.data.first_name;
                        fields['last_name'] = data.data.last_name;
                        fields['address1'] = data.data.address1;
                        fields['address2'] = data.data.address2;
                        fields['zipcode'] = data.data.zipcode;
                        fields['gender'] = data.data.gender;
                        fields['profile_pic'] = data.data.profile_pic;
                        
                        this.setState({
                            fields : fields,
                        });

                        return true;

                    }
    
                }).catch((error) => {
                    console.log('error',error);
                });


        }

    }

    __handleSubmit(event)
    {
        event.preventDefault();

        /**
         * Coping validation object from state
         */
        const {validation,fields} = this.state;
        
        let response = Validation.validate(validation,fields);
        
        validation['errMsgs'] = response.messages;
        validation['hasError'] = response.hasError;

        
        /**
         * if there is no error send api call to save records
         */
        if(response.hasError){
            this.userService.save(this.state.fields)
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
            }).then(data => {

                if(data.success === "true" || data.success === true){

                    this.setState({
                        redirecToIndex : true,
                    });  
                    
                    let notification = {
                        message : data.message ? data.message : 'User Update Sucessfully',
                        type : 'success',
                    }

                    this.userService.__notification(notification);

                }

            });
        } else {
            this.setState({ validation : validation });
        }
        
        
    }

    /**
     * 
     * @param {object} event 
     * 
     * Checking for validation of field on setting its value to state
     */
    __handleChange(event)
    {
        /**
         * not using because it will not work of radio,checkbox etc
         * ref link : https://github.com/WickyNilliams/react/commit/5bf8cda58f81e940d7f2eafb18bd87c4f1244882
         */
        //event.preventDefault();
        
        /**
         * Coping validation object from state
         */
        let validation = {...this.state.validation};

        /**
         * getting fields from state
         */
        let fields = {...this.state.fields};

        fields[event.target.name] = event.target.value;
        
        let response = Validation.validate(validation,fields,event.target.name);
        
        let errMsgs = {...this.state.validation.errMsgs};

        errMsgs[event.target.name] = response.messages[event.target.name];

        validation['errMsgs'] = errMsgs;
        validation['hasError'] = response.hasError;

        this.setState({ fields : fields,validation : validation });

    }

    __handleFileEvent(filesObject)
    {
        /**
         * getting fields from state
         */
        let fields = {...this.state.fields};
        
        let uploadFiles = {};

        Object.keys(filesObject.files).map(fileIndex => {

            uploadFiles[filesObject['name']] = filesObject.files[fileIndex];

            return true;
        });

        fields[filesObject['name']] = uploadFiles[filesObject['name']];

        /**
         * Coping validation object from state
         */
        let validation = {...this.state.validation};

        let response = Validation.validate(validation,fields,filesObject['name']);

        validation['errMsgs'] = response.messages;
        validation['hasError'] = response.hasError;

        this.setState({ fields : fields,validation : validation });

    }

    /**
     * render output
     */
    render()
    {

        const {first_name,last_name,address1,address2,zipcode,gender,profile_pic} = this.state.fields;
        const {errMsgs,hasError} = this.state.validation;
        const {redirecToIndex} = this.state;
        const {fileUpload} = this.state;

        if (redirecToIndex === true) {
            return <Redirect to="/admin/users" />
        }

        return (
            <div className="row">
                <div className="widget">
                    <div className="widget-body">

                        <NotificationContainer/>

                        <form className="form-horizontal form-bordered" onSubmit={this.__handleSubmit}>

                            <div className={ errMsgs && errMsgs.first_name ? "form-group has-error" : first_name ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="userFirstName" className="col-sm-2 control-label no-padding-right">First Name</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="userFirstName" 
                                        name="first_name" 
                                        placeholder="First Name" 
                                        value={first_name || ''} 
                                        onChange={this.__handleChange}
                                    />
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.first_name ? errMsgs.first_name :  ''} />
                                </div>
                            </div>

                            <div className={ errMsgs && errMsgs.last_name ? "form-group has-error" : last_name ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="userLastName" className="col-sm-2 control-label no-padding-right">Last Name</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="userLastName" 
                                        name="last_name" 
                                        placeholder="Last Name" 
                                        value={last_name || ''} 
                                        onChange={this.__handleChange}
                                    />
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.last_name ? errMsgs.last_name :  ''} />
                                </div>
                            </div>

                            <div className={ errMsgs && errMsgs.profile_pic ? "form-group has-error" : profile_pic ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="userProfilePic" className="col-sm-2 control-label no-padding-right">Profile Pic</label>
                                <div className="col-sm-10">
                                    <FileInputComponent handleFileEvent={fileUpload.callback}  accept="image/*" name="profile_pic"/>
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.profile_pic ? errMsgs.profile_pic :  ''} />
                                </div>
                            </div>

                            <div className={ errMsgs && errMsgs.gender ? "form-group has-error" : gender ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="userLastName" className="col-sm-2 control-label no-padding-right">Gender</label>
                                <div className="col-sm-10">

                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="Male" name="gender" id="maleGender" checked={ gender === 'Male'} onChange={(e) => this.__handleChange(e)}/>
                                            <span className="text">Male </span>
                                        </label>
                                    </div>

                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="Female" name="gender" id="femaleGender" checked={ gender === 'Female'} onChange={(e) => this.__handleChange(e)} /> 
                                            <span className="text">Female </span>
                                        </label>
                                    </div>

                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="Other" name="gender" id="femaleOther" checked={ gender === 'Other'} onChange={(e) => this.__handleChange(e)}/> 
                                            <span className="text">Other </span>
                                        </label>
                                    </div>
                                     
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.gender ? errMsgs.gender :  ''} />
                                </div>
                            </div>

                            <div className={ errMsgs && errMsgs.address1 ? "form-group has-error" : address1 ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="userAddress1" className="col-sm-2 control-label no-padding-right">Address1</label>
                                <div className="col-sm-10">
                                    <textarea 
                                        type="text" 
                                        className="form-control"
                                        id="userAddress1" 
                                        name="address1" 
                                        placeholder="Address1" 
                                        value={address1 || ''} 
                                        onChange={this.__handleChange}
                                        rows={5}
                                    />
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.address1 ? errMsgs.address1 :  ''} />
                                </div>
                            </div>

                            <div className={ errMsgs && errMsgs.address2 ? "form-group has-error" : address2 ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="userAddress2" className="col-sm-2 control-label no-padding-right">Address2</label>
                                <div className="col-sm-10">
                                    <textarea 
                                        type="text" 
                                        className="form-control"
                                        id="userAddress2" 
                                        name="address2" 
                                        placeholder="Address2"
                                        value={address2 || ''} 
                                        onChange={this.__handleChange}
                                        rows={5}
                                    />
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.address2 ? errMsgs.address2 :  ''} />
                                </div>
                            </div>

                            <div className={ errMsgs && errMsgs.zipcode ? "form-group has-error" : zipcode ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="userZipcode" className="col-sm-2 control-label no-padding-right">ZipCode</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="userZipcode" 
                                        name="zipcode" 
                                        placeholder="ZipCode"
                                        value={zipcode || ''} 
                                        onChange={this.__handleChange}
                                        rows={5}
                                    />
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.zipcode ? errMsgs.zipcode :  ''} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-2">
                                    <div className="col-sm-4">
                                        <button type="submit" className="btn btn-palegreen" disabled={ (hasError===false) ? 'disabled' : '' } >Save</button>
                                    </div>
                                    <div className="col-sm-4">
                                        <button type="button" className="btn" onClick={ () => {this.props.history.push('/admin/users')} } >&lt;&lt; Back</button>
                                    </div>
                                </div>
                            </div>

                            
                        </form>

                    </div>
                </div>
            </div>
        );   
    }


}

const UserEdit = connect(mapStateToPros, null)(UserEditClass);
export default UserEdit;