import React,{ Component } from "react";
import { Switch,Route } from "react-router-dom";
import LoanTypeCreate from "./create";
import LoanTypeList from "./list";
import LoanTypeEdit from "./edit";

class LoanIndex extends Component {

    render(){

        const rootPath = this.props.match.path;
        
        return (

            
            <Switch>
                <Route exact path={rootPath} component={LoanTypeList}/>
                <Route exact path={rootPath + "/create"} component={LoanTypeCreate}/>
                <Route exact path={rootPath + "/edit/:id"} component={LoanTypeEdit}/>
            </Switch>
                
        );
    }
}


export default LoanIndex;