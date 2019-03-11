import React,{ Component } from "react";
import { Switch,Route } from "react-router-dom";
import UserList from "./list";
import UserEdit from "./edit";

class UserIndex extends Component {

    render(){

        const rootPath = this.props.match.path;

        return (

            <Switch>
                <Route exact path={rootPath} component={UserList}/>
                <Route exact path={rootPath + "/edit/:id"} component={UserEdit}/>
            </Switch>
                
        );
    }
}


export default UserIndex;