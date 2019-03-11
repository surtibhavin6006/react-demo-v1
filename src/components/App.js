import React,{ Component } from "react";
import { Route,Switch } from "react-router-dom";
import Login from "./Auth/login";
import Home from "./common/home";
import PrivateRoute from "./Auth/PrivateRoute";
import Loader from "./other/Loader";

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading : true
        }
    }

    componentDidMount(){
        this.setState({loading:false})
    }

    render() {
        const {loading} = this.state;
        return (
            <div>
                { loading ? <Loader/> : '' }
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute path="/" component={Home}  />
                </Switch>
            </div>
        );

    }

}

export default App;