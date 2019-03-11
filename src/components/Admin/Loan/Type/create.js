import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoanTypeService from "../../../../services/Loan/type";
import Validation from "../../../../validation/Validation";
import {NotificationContainer} from 'react-notifications';
import ErrorMessage from "../../../validation/ErrorMessage";

const mapStateToPros = (state) => {
    return {
        user : state.user
    }
};

class LoanTypeCreateClass extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            fields : {
                name : '',
                interest_type : '',
                interest_rate : '',
            },
            validation : {
                rules : {
                    name : ['required'],
                    interest_type : ['required'],
                    interest_rate : ['required','numeric','min:0'],
                },
                messages : {
                    name : {
                        required : 'Please enter interest name'
                    },
                    interest_type : {
                        required : 'Please select interest type'
                    },
                    interest_rate : {
                        required : 'Please enter interest rate',
                        numeric : 'Interest rate must be numeric',
                        min : 'Interest rate must be greater than 0'
                    }
                }
            },
            redirecToIndex : false,
        }

        this.__handleSubmit = this.__handleSubmit.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
    
        this.loanTypeService = new LoanTypeService();
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
        
            this.loanTypeService.save(this.state.fields)
                .then(response => {
                    if(!response.ok){
                        this.loanTypeService.__handleError();
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
                            message : data.message ? data.message : 'Loan Type Created Sucessfully',
                            type : 'success',
                        }

                        this.loanTypeService.__notification(notification);

                    }

                });
        } else {
            this.setState({ validation : validation });
        }
    }

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
        
        validation['errMsgs'] = response.messages;
        validation['hasError'] = response.hasError;

        setTimeout(() => {
            this.setState({ fields : fields,validation : validation });
        });

    }

    render()
    {

        const {name,interest_type,interest_rate} = this.state.fields;
        const {errMsgs,hasError} = this.state.validation;
        const {redirecToIndex} = this.state;
        

        if (redirecToIndex === true) {
            return <Redirect to="/admin/loan/types" />
        }

        return (
            <div className="row">
                <div className="widget">
                    <div className="widget-body">
                        <NotificationContainer/>
                        <form className="form-horizontal form-bordered" onSubmit={this.__handleSubmit}>

                            <div className={ errMsgs && errMsgs.name ? "form-group has-error" : name ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="loanTypeName" className="col-sm-2 control-label no-padding-right">Name</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="loanTypeName" 
                                        name="name" 
                                        placeholder="Loan Type Name" 
                                        value={name || ''} 
                                        onChange={this.__handleChange}
                                    />
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.name ? errMsgs.name :  ''} />
                                </div>
                            </div>

                            <div className={ errMsgs && errMsgs.interest_type ? "form-group has-error" : interest_type ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="loanTypeInterestType" className="col-sm-2 control-label no-padding-right">Interest Type</label>
                                <div className="col-sm-10">
                                    <select 
                                        className="form-control" 
                                        id="loanTypeInterestType" 
                                        name="interest_type" 
                                        onChange={this.__handleChange}
                                        value = {interest_type || ''}
                                    >
                                        <option value="">--Select Interest Type--</option>
                                        <option value="Fixed Monthly Amount">Fixed Monthly Amount</option>
                                    </select>
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.interest_type ? errMsgs.interest_type :  ''} />
                                </div>
                            </div>

                            <div className={ errMsgs && errMsgs.interest_rate ? "form-group has-error" : interest_rate ?  "form-group has-success" : "form-group" }>
                                <label htmlFor="loanTypeInterestRate" className="col-sm-2 control-label no-padding-right">Interest Rate</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="loanTypeInterestRate" 
                                        name="interest_rate" 
                                        placeholder="Interest Rate" 
                                        value={interest_rate || ''} 
                                        onChange={this.__handleChange}
                                    />
                                    <ErrorMessage errorMessage={errMsgs && errMsgs.interest_rate ? errMsgs.interest_rate :  ''} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-2">
                                    <div className="col-sm-4">
                                        <button type="submit" className="btn btn-palegreen" disabled={ (hasError===false) ? 'disabled' : '' } >Save</button>
                                    </div>
                                    <div className="col-sm-4">
                                        <button type="button" className="btn" onClick={ () => {this.props.history.push('/admin/loan/types')} } >&lt;&lt; Back</button>
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

const LoanTypeCreate = connect(mapStateToPros, null)(LoanTypeCreateClass);
export default LoanTypeCreate;