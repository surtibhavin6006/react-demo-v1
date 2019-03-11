import React,{ Component } from "react";
import uuidv1 from 'uuid/v1';

class FileInputShowComponent extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            imagesDemo : props.imagesDemo,
            imagesSrc : [],
            handleFileEvent : props.handleFileEvent
        }

        this.__prepareImageSrc = this.__prepareImageSrc.bind(this);
    }

    componentDidMount()
    {
        this.__prepareImageSrc();
    }

    /**
     * Preparing image src and adding src to state
     */
    __prepareImageSrc()
    {

        const {imagesDemo} = this.state;

        let imagesSrc = [];
        if(imagesDemo !== undefined && Object.keys(imagesDemo).length > 0){

            let fileLength = Object.keys(imagesDemo).length;
            
            let imagesDemoCnt = 1;
            Object.keys(imagesDemo).map(obj => {

                let reader = new FileReader();
                reader.readAsDataURL(imagesDemo[obj]);
                
                reader.onloadend = function (e) {

                    let imageSrcInner = {};

                    imageSrcInner['name'] = imagesDemo[obj]['name'];
                    imageSrcInner['src'] = reader.result;

                    imagesSrc.push(imageSrcInner);

                    if(imagesDemoCnt === fileLength){
                        this.setState({imagesSrc : imagesSrc});
                    } else {
                        this.setState({imagesSrc : []});
                    }

                    imagesDemoCnt++;

                    return true;

                }.bind(this);

                return true;
            });

        }
    }

    render() 
    {
        const {imagesSrc} = this.state;

        return (
            <div key={uuidv1()} className="showingFilePreviewWrapper">

                {
                    imagesSrc && imagesSrc.length > 0?
                         imagesSrc.map((image,index) => {
                            return <div key={uuidv1()} className="showingFilePreview">
                                    <img key={uuidv1()} alt={image.name} className="img-thumbnail" src={image.src} />
                                    <span key={uuidv1()}>{image.name}</span>
                                    {/* <i className="glyphicon glyphicon-trash text-danger" onClick={() => this.__removeFile(index + 1)}></i> */}
                                </div>
                         })
                    : null
                }

            </div>
        );

    }

}

export default FileInputShowComponent;