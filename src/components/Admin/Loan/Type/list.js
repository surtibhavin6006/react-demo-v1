import React,{ Component } from "react";

import { connect } from "react-redux";
import { profileInfo } from "../../../../redux/actions/user";
import TableComponent from "../../../other/TableComponent";
import HelperLocalStorage from "../../../../helpers/local-storage-helper";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {NotificationContainer} from 'react-notifications';
import uuidv1 from 'uuid/v1';
import LoanTypeService from "../../../../services/Loan/type";

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


class LoanTypeListClass extends Component {

    constructor(props){
        
        super(props);

        this.loanTypeListService = new LoanTypeService();
        this.__delete = this.__delete.bind(this);
        this.__load = this.__load.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePerPage = this.handlePerPage.bind(this);

        this.state = {
            data : null,
            table : {
                heading : 'Loan Type List', 
                className : 'customclass', 
                footer : 'Footer ', 
                noRecordFoundText : 'There are no records',
                headerAction : {
                    title : 'Add New Loan Type',
                    path : '/admin/loan/types/create'
                },
                headerPerpage : {
                    options : ['5','10','20','100'],
                    onChange : (d) => {
                        this.handlePerPage(d);
                    }
                },
                headers : { 
                    fields : [
                        {
                            title : 'Name', 
                            data : 'name', 
                            sortable : false
                        },
                        {
                            title : 'Interest Type',
                            data : 'interest_type',
                            sortable : false
                        },
                        {
                            title : 'Interest Rate',
                            data : 'interest_rate',
                            sortable : false,
                            render : data => { return data.interest_rate + '%'; }
                        }
                    ],
                    rowActions : {
                        title : 'Actions',
                        actions : {
                            edit : {
                                path : data => { 
                                    return '/admin/loan/types/edit/'+data.id 
                                },
                                show : true,
                                title : {
                                    class : 'btn-info',
                                    text : 'Edit'
                                }
                            },
                            delete : {
                                show : true,
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
            },
            pagination :{
                activePage : 1,
                loadPage : 1,
                totalItemsCount : 0,
                totalItemsPerpage : 15,
                onChange : (d) => {
                    this.handlePageChange(d);
                }
            }
            
        }

        
    }

    __confirmDelete(data){

        const options = {
            title: 'Delete',
            message: 'Are you sure want to delete it?',
            childrenElement: () => <div />,
            customUI: ({ title, message, onClose }) => <div className="custom-ui"><h1>{title}</h1><p>{message}</p><button onClick={ () => onClose()  }>No</button><button onClick={ () => this.__delete(data,onClose) }>Yes, Delete it!</button></div>,
            willUnmount: () => {}
        }
         
        confirmAlert(options);
    }
    

    __delete(data,onClose){
        
        this.loanTypeListService.delete(data.id)
            .then(response => {
                if(!response.ok){
                    this.loanTypeListService.__handleError();
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

                    this.loanTypeListService.__notification(notification);

                    this.setState({
                        redirecToIndex : true,
                    }); 

                    this.__load();

                }

                onClose();

            });
    }

    componentDidMount(){
        this.__load();
    }

    __load(){
        
        var dataPagination = this.state.pagination;

        this.loanTypeListService.all(dataPagination)
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
                
                //this.setState({data : data.data});

                let pagination = Object.assign({},this.state.pagination);
                pagination['activePage'] = Number(data.meta.current_page);
                pagination['totalItemsCount'] = Number(data.meta.total);

                this.setState({data : data.data,pagination : pagination});

                
                return true;
                
            }).catch((error) => {
                alert('error');
                return false;
            });
    }

    handlePageChange(pageNumber) {

        let pagination = Object.assign({},this.state.pagination);
        pagination['loadPage'] = Number(pageNumber);

        setTimeout(()=> {
            this.setState({pagination : pagination});

            console.log(this.state.pagination)
            this.__load();
            
        })
        
        console.log(`active page is ${pageNumber}`);
    }

    handlePerPage(event) {

        let perPage = event.target.value;

        let pagination = Object.assign({},this.state.pagination);
        pagination['totalItemsPerpage'] = Number(perPage);

        setTimeout(()=> {
            this.setState({pagination : pagination});
            this.__load();
            
        })
        
    }

    render(){

        return (

            <div className="row">
                <NotificationContainer/>
                {
                    this.state.data ? <TableComponent key={uuidv1()} data={this.state.data} table={this.state.table} pagination={this.state.pagination} headerPerpage={this.state.table.headerPerpage} /> : "Loading"
                }
            </div>

        );
    }
}

const LoanTypeList = connect(mapStateToPros, mapDispatchToPros)(LoanTypeListClass);
export default LoanTypeList;