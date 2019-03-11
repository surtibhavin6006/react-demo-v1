import BaseService from "../baseService";

export default class LoanTypeService extends  BaseService{

    all(data = {}){

        var params = {};
        
        if(data !== undefined && data.totalItemsPerpage !== undefined){
            params['per_page'] = data.totalItemsPerpage;
            params['page'] = data.loadPage === undefined ? 1 : data.loadPage;
        }

        return this.__authFetch("loan/types","GET",params);
    }

    getById(id){
        return this.__authFetch("loan/type/"+id,"GET");                 
    }
    
    save(data){

        if(data.id){
            return this.__authFetch("loan/type/"+data.id,"PATCH",data);
        } else {
            return this.__authFetch("loan/type/","POST",data);
        }
    }

    delete(id){
        return this.__authFetch("loan/type/"+id,"DELETE");
    }
}