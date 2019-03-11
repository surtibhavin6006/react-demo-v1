import React,{ Component } from "react";
import uuidv1 from 'uuid/v1';
import { NavLink } from "react-router-dom";

class TableRowComponent extends Component {

    constructor(props)
    {
        
        super(props);

        this.state = {
            fields : props.headerFilelds,
            rowActions : props.rowActions,
            datas : props.datas,
            noRecordFoundText : props.noRecordFoundText,
            rows : null
        }

        this.__processRow = this.__processRow.bind(this);

    }

    componentDidMount()
    {
        this.__processRow();
    }

    /**
     * Processing Table Rows
     */
    __processRow()
    {
        const {fields,rowActions,datas} = this.state;
        
        /**
         * rows will contain all rows records
         */
        let rows = [];
        
        /**
         * Checking and collecting data into rows
         */
        if(datas.length > 0) {

            /**
             * loop of datas
             */
            datas.map(data => {


                /**
                 * collecting single row data into row
                 */
                let row = [];

                fields.map(field => {

                    if(field.render !== undefined && typeof field.render === 'function'){
                        row.push(field.render(data));
                    } else if(field.data !== undefined){
                        row.push(data[field.data]);
                    }

                    return true;

                });

                /**
                 * adding the field's actions
                 */

                if(rowActions && rowActions.actions){
                    
                    let actions = rowActions.actions;

                    /**
                     * storeRowAction in one array
                     */
                    let finalRowAction = [];

                    Object.keys(actions).map((action) => {

                        let title,titleClass = ["btn","btn-xs"],show = true,path;
                        
                        /**
                         * checking that action is visible or not for that row
                         */
                        if(actions[action].show && typeof actions[action].show === 'function'){
                            show = actions[action].show(data);
                        } else if(actions[action].show === false){
                            show = false;
                        }

                        /**
                         * if action is visible for that row
                         */
                        if(show){

                            /**
                             * set action key as its title as default
                             */
                            title = action;

                            /**
                             * first get title text and class
                             */
                            if(actions[action].title){
                                
                                
                                /**
                                 * if title has text define that text
                                 */
                                if(actions[action].title.text !== undefined){
                                    title = actions[action].title.text;
                                }

                                if(actions[action].title.class !== undefined){
                                    titleClass.push(actions[action].title.class);
                                }

                            }
                            
                            /**
                             * either action has got path or metod
                             */

                            if(actions[action].path){
                                let actionButton = <button key={uuidv1()} className={titleClass.join(" ")}>{title}</button>;
                                path = <span key={uuidv1()} className="ml-5"><NavLink key={uuidv1()} to={actions[action].path(data)}>{actionButton}</NavLink> </span>
                            }  else if(actions[action].method && typeof actions[action].method === 'function') {
                                let actionButton = <span key={uuidv1()} className="ml-5"><button key={uuidv1()} className={titleClass.join(" ")} onClick={() => actions[action].method(data)}>{title}</button></span>;
                                path = actionButton;
                            }

                            finalRowAction.push(path);
                        }
                        

                        return true;
                    });

                    /**
                     * adding final row action into row array
                     */

                    row.push(finalRowAction);
                    
                }
                
                rows.push(row);

                return true;
            });
            
        }

        this.setState({rows : rows});

    }

    render()
    {

        const {rows,fields,rowActions,noRecordFoundText} = this.state;

        let totalColumn = fields.length;

        if(rowActions.actions){
            totalColumn++;
        }
        
        return(
            
            <tbody>
                {
                    rows && rows.length > 0 ? 
                        rows.map(row => {
                            return  <tr key={uuidv1()}>
                                    {
                                        row.map(r => {
                                            return <td key={uuidv1()}>{r}</td>
                                        })
                                    }        
                                </tr>
                        })
                    : <tr>
                            <td key={uuidv1()} colSpan={totalColumn}>
                                { noRecordFoundText ? noRecordFoundText : "No Record Found" } 
                            </td>
                    </tr>
                }
            </tbody>
        );
    }




}

export default TableRowComponent;