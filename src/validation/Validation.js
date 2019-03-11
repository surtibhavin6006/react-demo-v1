

export default class Validation{

    static validate(validation,data,validateField)
    {

        this.message = {};

        if(!this.validate.rules) {
            this.rules = validation.rules;
            this.messages = validation.messages;
            this.data = data;
            this.validateField = validateField;

            if(this.validateField !== undefined){
                this.__validation();
            } else {
                this.__validationAll();
            }

            
        }

        let returnData = {
            hasError : Object.keys(this.message).length > 0 ? false : true,
            messages : this.message
        }

        return returnData;
    }

    static __validation()
    {
        let field = this.validateField;

        console.log(this.validateField);

        if(!field || this.rules[field] === undefined){
            return true;
        }
    
        if(typeof this.rules[field] === 'object' && this.rules[field].length !== undefined){

            this.rules[field].map((rule) => {
            
                switch(rule){
                    case 'required':
                        this.__required(field);
                        break;
                    case 'email':
                        this.__email(field);
                        break;
                    case 'numeric':
                        this.__numeric(field);
                        break;
                    /* case rule.match(/min:/):
                        this.__minmax(field,'min');
                        break;
                    case rule.match(/man:/):
                        this.__minmax(field,'max');
                        break; */
                    default:
                        if(typeof rule === "function"){
                            rule(this.data[field]);
                        }
                }
                
                return true;
            }); 

        } else {

            if(this.rules[field].required !== undefined){
                this.__required(field);
            }
            
            if(this.rules[field].email !== undefined){
                this.__email(field);
            }

            if(this.rules[field].numeric !== undefined){
                this.__numeric(field);
            }

            if(this.rules[field].min !== undefined){
                this.__min(field,this.rules[field].min,this.rules[field].numeric);
            }

            if(this.rules[field].max !== undefined){
                this.__max(field,this.rules[field].max,this.rules[field].numeric);
            }

            if(this.rules[field].file !== undefined){
                this.__file(field,this.rules[field].file.type);
            }

            if(this.rules[field].render !== undefined 
                && typeof this.rules[field].render === 'function'){
                this.rules[field].render(field);
            }
        
        }

        return true;
        
    }

    static __validationAll()
    {
        
        Object.keys(this.rules).map(field => {

            if(typeof this.rules[field] === 'object' && this.rules[field].length !== undefined){

                this.rules[field].map((rule) => {
                
                    switch(rule){
                        case 'required':
                            this.__required(field);
                            break;
                        case 'email':
                            this.__email(field);
                            break;
                        case 'numeric':
                            this.__numeric(field);
                            break;
                        /* case rule.match(/min:/):
                            this.__minmax(field,'min');
                            break;
                        case rule.match(/man:/):
                            this.__minmax(field,'max');
                            break; */
                        default:
                            if(typeof rule === "function"){
                                rule(this.data[field]);
                            }
                    }
                    
                    return true;
                }); 

            } else {

                if(this.rules[field].required !== undefined){
                    this.__required(field);
                }
                
                if(this.rules[field].email !== undefined){
                    this.__email(field);
                }

                if(this.rules[field].numeric !== undefined){
                    this.__numeric(field);
                }

                if(this.rules[field].min !== undefined){
                    this.__min(field,this.rules[field].min,this.rules[field].numeric);
                }

                if(this.rules[field].max !== undefined){
                    this.__max(field,this.rules[field].max,this.rules[field].numeric);
                }

                if(this.rules[field].file !== undefined){
                    this.__file(field,this.rules[field].file.type);
                }

                if(this.rules[field].render !== undefined 
                    && typeof this.rules[field].render === 'function'){
                    this.rules[field].render(field);
                }
            
            }

            return true;
        });
        
    }

    static __required(field)
    {

        if(!this.data[field] && !this.message[field]){

            this.message[field] = field + ' is required';

            if(this.messages && this.messages[field] && this.messages[field]['required']){
                this.message[field] = this.messages[field]['required'];
            }
            
        }

        return true;
    
    }

    static __email(field)
    {

        //if(!this.message[field]){

            let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            
            if(!this.data[field].match(mailformat)){
                this.message[field] = field + ' is not valid email address';

                if(this.messages && this.messages[field] && this.messages[field]['email']){
                    this.message[field] = this.messages[field]['email'];
                }
            }

        //}

        return true;
    
    }

    static __numeric(field)
    {

        //if(!this.message[field]){

            if(isNaN(this.data[field]) !== false){
                
                this.message[field] = field + ' is not number';

                if(this.messages && this.messages[field] && this.messages[field]['numeric']){
                    this.message[field] = this.messages[field]['numeric'];
                }
            }

        //}

        return true;
    
    }

    static __min(field,compareValue,type)
    {
        if(this.data[field] !== undefined){

            compareValue = Number(compareValue);
            if(type){

                if(compareValue > Number(this.data[field])){

                    this.message[field] = field + ' must be greather than ' + compareValue;

                    if(this.messages && this.messages[field] && this.messages[field]['min']){
                        this.message[field] = this.messages[field]['min'];
                    }

                }

            } else {

                if(compareValue > this.data[field].length){

                    this.message[field] = field + ' length must be greather than ' + compareValue;

                    if(this.messages && this.messages[field] && this.messages[field]['min']){
                        this.message[field] = this.messages[field]['min'];
                    }

                }
            }
        }

        return true;
    
    }

    static __max(field,compareValue,type)
    {
        if(this.data[field] !== undefined){

            compareValue = Number(compareValue);
            if(type){

                if(compareValue < Number(this.data[field])){

                    this.message[field] = field + ' must be greather than ' + compareValue;

                    if(this.messages && this.messages[field] && this.messages[field]['min']){
                        this.message[field] = this.messages[field]['min'];
                    }

                }

            } else {

                if(compareValue < this.data[field].length){

                    this.message[field] = field + ' length must be greather than ' + compareValue;

                    if(this.messages && this.messages[field] && this.messages[field]['min']){
                        this.message[field] = this.messages[field]['min'];
                    }

                }
            }
        }

        return true;
    
    }

    static __file(field,types)
    {
        if(this.data[field] !== undefined && this.data[field]['name'] !== undefined){
            let extension = this.data[field]['name'].slice((this.data[field]['name'].lastIndexOf(".") - 1 >>> 0) + 2);
            

            if(types !== undefined && typeof types === 'object' && types.length > 0){

                let checkTypes = types.map(type => {
                    return type === extension ? true : null
                });


                checkTypes = checkTypes.filter(function (checkType) {
                    return checkType != null;
                });

                if(checkTypes.length === 0) {
                    
                    this.message[field] = field + ' is must be type of '+types.join(",");    ;

                    /* if(this.messages && this.messages[field] && this.messages[field]['numeric']){
                        this.message[field] = this.messages[field]['numeric'];
                    } */
                }
            }
        }

        return true;
        
    }

    
}