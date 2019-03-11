import BaseService from "./baseService";

export default class RoleService extends  BaseService{

    all(){
        return this.__authFetch("roles","GET");
    }

    getById(id){
        return this.__authFetch("role/"+id,"GET");                 
    }
    
    save(data){

        if(data.id){
            return this.__authFetch("role/"+data.id,"PATCH",data);
        } else {
            return this.__authFetch("role/","POST",data);
        }
    }

    delete(id){
        return this.__authFetch("role/"+id,"DELETE");
    }
}