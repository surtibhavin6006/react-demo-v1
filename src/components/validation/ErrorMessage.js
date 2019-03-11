import React,{ Component } from "react";
import uuidv1 from "uuid";

class ErrorMessage extends Component{

    render(){

        return(
            <small id={uuidv1()} className='text-danger'>
                {this.props.errorMessage}
            </small>
        );

    }

}

export default ErrorMessage;