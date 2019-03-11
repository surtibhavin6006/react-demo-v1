import React,{ Component } from "react";
import uuidv1 from 'uuid/v1';

class TableHeaderComponent extends Component {

    constructor(props)
    {
        
        super(props);

        this.state = {
            fields : props.headerFilelds,
            rowActions : props.rowActions,
            headers : null
        }

        this.__processHeader = this.__processHeader.bind(this);

    }

    componentDidMount()
    {
        this.__processHeader();
    }

    /**
     * Processing Table Headers
     */
    __processHeader()
    {
        const {fields,rowActions} = this.state;

        let headers = [];
        
        /**
         * adding the field's header
         */
        if(fields) {

            fields.map(field => {

                let title;
                
                if(field.title !== undefined){
                    title = field.title;
                } else {
                    title = field.data;
                }

                headers.push(title);
                
                return true;
            });
            
        }

        /**
         * adding the field's rowActions
         */
        if(rowActions){
            headers.push(
                rowActions.title ? rowActions.title : 'Action'
            )
        }

        this.setState({headers : headers});

    }

    render()
    {

        const {headers} = this.state;

        return(
            
            headers ? 
                <thead>
                    <tr>
                        {
                            headers.map(header => {
                                return  <td key={uuidv1()}>{header}</td>
                            })
                        }
                    </tr>
                </thead>
                : null
        );
    }




}

export default TableHeaderComponent;