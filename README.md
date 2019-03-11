##About Project

**Description**

This is the demo react project frontend for login admin and creating loan type and editing existing users.


**Explore how system work**

- First we need to do login.
- We can see list of users and delete or edit them one by one.
- We can also see list of loan types and create,delete or edit them one by one.

##Custom Compoent

- **Table Compoenent**
    
    - Place
        - src/components/other/TableComponent.js
        - src/components/other/TableHeaderComponent.js
        - src/components/TableRowComponent.js
    
    - Usage 
        - Please import it where you want to use and below are the definition to put in you state.
        
        - It has two properties as shown below :
        
                    <TableComponent data={this.state.data} table={this.state.table} />
        
        
        - Example of state:
        
                    data : null,
                    table : {
                        heading : 'Users List', // optional 
                        className : 'customclass', // optional 
                        footer : 'Footer ', // optional 
                        noRecordFoundText : 'There are no records', // optional,
                        headers : { 
                             fields : [
                                {
                                    data : first_name
                                },
                                {
                                    title : 'Last Name',
                                    data : 'last_name'
                                }
                                {
                                    title : 'Full Name',
                                    render : data => {return data.first_name+''+data.last_name}
                                }
                                {
                                    title : 'Profile Pic',
                                    data : 'profile_pic',
                                    render : data => { return <img key={uuidv1()} width="125" src={data.profile_pic} alt="profile_pic" /> }
                                }
                             ],
                             rowActions : {
                                 title : 'Actions',
                                 actions : {
                                    edit : {
                                        path : data => { 
                                            return '/admin/user/edit/'+data.id 
                                        },
                                        show : true,
                                        title : {
                                            class : 'btn-info',
                                            text : 'Edit'
                                        }
                                                                                }
                                    },
                                    delete : {
                                       show : data => { 
                                            if(data.role[0].slug === 'admin') {  
                                                return false;
                                            }
                                           return true; 
                                        }
                                        title : {
                                            class : 'btn-danger',
                                            text : 'Delete'
                                        },
                                        method : data => {
                                            return this.__confirmDelete(data);
                                        }
                                    }
                             }
                        }
                    }
        
    
- **FileInputComponent**

    - Place
         - src/components/other/FileInputComponent.js
         - src/components/other/FileInputShowComponent.js
         
    - Usage 
        
        - Import that component and below is the sample code for that:
        
        - Code at JSX
        
                    <FileInputComponent handleFileEvent={fileUpload.callback} accept="image/*"   name="profile_pic"/>
         
        
        - Code at State
        
                    fileUpload : {
                        callback : (files) => {
                            this.__handleFileEvent(files)
                        },
                        files : null,
                    }
        
- **Pagination**

    - We have used pagination package but however we have set it into tablecomponent so,you do not need to define it everywhere.
    
    - Code at State
                
               pagination :{
                    activePage : 1,
                    loadPage : 1,
                    totalItemsCount : 0,
                    totalItemsPerpage : 15,
                    onChange : (d) => {
                        this.handlePageChange(d);
                    }
                }
            
    - Callback function
            
                handlePageChange(pageNumber) {
                    console.log(`active page is ${pageNumber}`);
                }
                
##Validation Service

- Path : 

    - src/validation/Validation.js
    
- Usage :
    
    - Import Validation Service.You must defined fields in state to use validation service.
    
    - Code at State:
    
    
                /**
                 * defining fields
                 */
                fields : {
                    id : props.match.params ? props.match.params.id : '',
                    first_name : '',
                    last_name : '',
                    address1 : '',
                    address2 : '',
                    zipcode : '',
                    gender : '',
                    profile_pic : ''
                },
                /**
                 * defining validation
                 */
                 
                /**
                 * defining validation
                 */
                validation : {
                    /**
                     * defining validation rule
                     */
                    rules : {
                        first_name : ['required'],
                        last_name : ['required'],
                        address1 : ['required'],
                        zipcode : ['required','numeric'],
                        gender : ['required'],
                        profile_pic : {
                            required : true,
                            file : {
                                type : ['png']
                            }
                        }
                    },
                    /**
                     * defining validation messages
                     */
                    messages : {
                        first_name : {
                            required : 'Please enter first name'
                        },
                        last_name : {
                            required : 'Please enter last name'
                        },
                        address1 : {
                            required : 'Please enter address1'
                        },
                        zipcode : {
                            required : 'Please enter zipcode',
                            numeric : 'Zipcode must be numeric'
                        },
                        gender : {
                            required : 'Please select gender'
                        },
                        profile_pic : {
                            required : 'Please choose profile pic',
                            file : {
                                type : ' File must be type of jpg,jpeg,png'
                            }
                        }
                    },
                    /**
                     * all fields error messages will be added here
                     */
                    errMsgs : {}
                }
    
    
    - Handle at Onchange:
    
                /**
                 * Checking for validation of field on setting its value to state
                 */
                __handleChange(event)
                {
                    /**
                     * not using because it will not work of radio,checkbox etc
                     * ref link : https://github.com/WickyNilliams/react/commit/5bf8cda58f81e940d7f2eafb18bd87c4f1244882
                     */
                    //event.preventDefault();
                    
                    /**
                     * Coping validation object from state
                     */
                    let validation = {...this.state.validation};
                
                    /**
                     * getting fields from state
                     */
                    let fields = {...this.state.fields};
                
                    fields[event.target.name] = event.target.value;
                    
                    let response = Validation.validate(validation,fields,event.target.name);
                    
                    let errMsgs = {...this.state.validation.errMsgs};
                
                    errMsgs[event.target.name] = response.messages[event.target.name];
                
                    validation['errMsgs'] = errMsgs;
                    validation['hasError'] = response.hasError;
                
                    this.setState({ fields : fields,validation : validation });
                
                }
    
    - Handle at Submit
    
                __handleSubmit(event)
                {
                    event.preventDefault();
                
                    /**
                     * Coping validation object from state
                     */
                    const {validation,fields} = this.state;
                    
                    let response = Validation.validate(validation,fields);
                    
                    validation['errMsgs'] = response.messages;
                    validation['hasError'] = response.hasError;
                
                    
                    /**
                     * if there is no error send api call to save records
                     */
                    if(response.hasError){
                        // Api Call
                    } else {
                        this.setState({ validation : validation });
                    }
                    
                    
                }