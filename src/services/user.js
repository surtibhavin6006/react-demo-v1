import BaseService from "./baseService";

export default class UserService extends BaseService{

    all(){

        let params = {
            includes : 'role'
        }

        return this.__authFetch("users","GET",params);
    }

    getById(id){
        return this.__authFetch("user/"+id,"GET");                 
    }
    
    save(data){

        if(data.id){
            return this.__authFetch("user/"+data.id,"PATCH",data);
        } else {
            return this.__authFetch("user/","POST",data);
        }
    }

    delete(id){
        return this.__authFetch("user/"+id,"DELETE");
    }
}