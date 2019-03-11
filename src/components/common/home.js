import React,{ Component } from "react";
import NavBar from "./navbar";
import LeftSideBar from "./leftSideBar";
import RightSideBar from "./rightSideBar";
import Loader from "../other/Loader";

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading : true
        }
    }

    componentDidMount(){
        this.setState({loading:false})
    }

    render(){
        const {loading} = this.state;
        
        return (

            <div>
                { loading ? <Loader/> : '' }
                <NavBar/>

                <div className="main-container container-fluid">
                    <div className="page-container">
                        <LeftSideBar  />
                        <RightSideBar   />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;