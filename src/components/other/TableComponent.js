import React,{ Component } from "react";
import uuidv1 from 'uuid/v1';
import { NavLink } from "react-router-dom";

import Pagination from "react-js-pagination";
import TableHeaderComponent from "./TableHeaderComponent";
import TableRowComponent from "./TableRowComponent";

class TableComponent extends Component {

    constructor(props){
        
        super(props);

        this.state = {
            data : props.data,
            headerAction : props.table.headerAction,
            headerFilelds : props.table.headers.fields,
            rowActions : props.table.headers.rowActions,
            heading : props.table.heading,
            noRecordFoundText : props.table.noRecordFoundText,
            className : ["well",props.table.className],
            footer : props.table.footer,
            finalData : null,
            finalHeader : null,
            pagination : props.pagination,
            headerPerpage : props.table.headerPerpage
        }

    }

    componentDidMount(){
        this.__handleClass();
    }

    __handleClass(){

        let {className,heading,footer} = this.state;

        if(heading){
            className.push("with-header");
        }

        if(footer){
            className.push("with-footer");
        }

        this.setState({className : className});
    
    }

    render(){

        const {heading,className,footer,pagination,headerAction,headerPerpage} = this.state;
        
        const {headerFilelds,rowActions,data,noRecordFoundText} = this.state;

        if(!data){
            return(
                <div className="col-xs-12 col-md-12">
                    Loading...
                </div>
            )
        }

        return (

            <div className="col-xs-12 col-md-12">
                <div className={ className.join(" ") }>
                    
                    
                    {
                        /**
                         * Rendering header above the table
                         */
                    
                        heading || headerAction || headerPerpage ? 

                            <div className="header bordered-success">
                                
                                {
                                    /**
                                     * displaying header above the table if it is defined
                                     */
                                    heading ? heading : ''
                                }

                                {
                                    /**
                                     * displaying header action mostly create
                                     */
                                    headerAction ? 
                                        <span className="pull-right ml-5">
                                            <NavLink className="btn btn-info" key={uuidv1()} to={headerAction && headerAction.path ? headerAction.path : '' } >
                                                {headerAction && headerAction.title ? headerAction.title : 'Create'}
                                            </NavLink>
                                        </span> : ''
                                }

                                {
                                    /**
                                     * displaying per page option in dropdown
                                     */
                                    
                                    headerPerpage && headerPerpage.options ?
                                    <span className="pull-right">
                                        <select className="form-control" onChange={headerPerpage.onChange} value={pagination && pagination.totalItemsPerpage ? pagination.totalItemsPerpage : null}>
                                            { 
                                                headerPerpage.options.map(option => {
                                                    return <option key={uuidv1()} value={option}>{option}</option>
                                                })
                                            }
                                        </select>
                                    </span> : ''
                                }

                                
                            </div> : ''
                    }


                    <div className="table-scrollable">
                        
                        {
                            /**
                             * Rendering Table Component and its childs component
                             */
                        }
                        <table className="table table-striped table-bordered table-hover">
                            <TableHeaderComponent headerFilelds={headerFilelds} rowActions={rowActions}/>
                            <TableRowComponent headerFilelds={headerFilelds} rowActions={rowActions} datas={data} noRecordFoundText={noRecordFoundText} />
                        </table>
                        
                        

                        
                        {
                            /**
                             * Rendering pagination if pagination is defined
                             */

                            pagination ? 
                            <div className="pagination-wrap">
                                <Pagination
                                    activePage={this.state.pagination.activePage}
                                    itemsCountPerPage={this.state.pagination.totalItemsPerpage}
                                    totalItemsCount={this.state.pagination.totalItemsCount}
                                    //pageRangeDisplayed={5}
                                    onChange={this.props.pagination.onChange}
                                />
                            </div> : ''
                        }
                        
                    </div>


                    {
                        /**
                         * rendering footer if define
                         */
                        footer ? <div className="footer">{footer}</div> : ''
                    }
                   
                </div>

            </div>

        );
    }
}

export default TableComponent;