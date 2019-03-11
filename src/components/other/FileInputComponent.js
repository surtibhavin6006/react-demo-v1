import React,{ Component } from "react";
import FileInputShowComponent from "./FileInputShowComponent";
import uuidv1 from 'uuid/v1';

class FileInputComponent extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            imagesDemo : [],
            multiple : props.multiple ? true : false,
            handleFileEvent : props.handleFileEvent,
            accept : props.accept ? props.accept : null,
            name : props.name ? props.name : 'fileInput'
        }

        this.__handleChange = this.__handleChange.bind(this);
        this.__handleFileEvent = this.__handleFileEvent.bind(this);
    }

    shouldComponentUpdate(props,state) {

       if(state.imagesDemo.length > 0){


            if(this.state.imagesDemo.length === 0){
                return true;
            } else if(this.state.imagesDemo.length > 0) {

                if(state.imagesDemo[0].size !== this.state.imagesDemo[0].size){
                    return true;
                }
            }

       }

       return false;
    }

    __handleChange(event)
    {
        if(event.target.files){

            let files = {...this.state.imagesDemo};
            files = event.target.files;
            this.__handleFileEvent(files);
            this.setState({imagesDemo : files});
            
            
        }
    }

    __handleFileEvent(files)
    {
        const {handleFileEvent,name,accept} = this.state;

        if(typeof handleFileEvent === 'function'){

            let passedObject = {
                files : files,
                name : name,
                accept : accept
            };

            handleFileEvent(passedObject);
        }
        
    }

    render() 
    {
        const {imagesDemo,multiple,accept,name} = this.state;

        return (

            <div className="fileInputWithView" key={uuidv1()}>
            
                <input 
                    type="file" 
                    multiple={ multiple }
                    className="form-control"
                    id={uuidv1()} 
                    name={name}
                    key={uuidv1()}
                    accept={accept}
                    onChange={this.__handleChange}
                />

                {
                    /**
                     * Calling component to render to view file
                     */
                     imagesDemo && Object(imagesDemo).length > 0 ?
                    <FileInputShowComponent key={uuidv1()}  imagesDemo={imagesDemo} /> : ''
                }

            </div>
            
            
        );

    }

}

export default FileInputComponent;