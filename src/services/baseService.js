import {baseUrl} from '../constants/base';

import HelperLocalStorage from '../helpers/local-storage-helper';
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';

export default class BaseService {

    constructor()
    {

        let userData = HelperLocalStorage.getLoginInfo();

        this.token = userData ? userData.token : '';
        this.token_type = userData ? userData.token_type : '';
        this.baseUrl = baseUrl;
    }

    __authFetch(url,method,params = {})
    {

        let payLoad = {
            //method: method.toUpperCase(),
            method: method.toUpperCase() === 'GET' ? 'GET' : 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'Content-Type': 'multipart/form-data',
                'Authorization': this.token_type + ' ' + this.token
            }
        };

        let ApiUrl = this.baseUrl + url;
        
        if(Object.keys(params).length > 0){
            
            if(method.toLowerCase() === 'get'){
                
                let getParams = [];

                Object.keys(params).map(field => {
        
                    getParams.push(field+'='+params[field]);
                    return true;

                });

                ApiUrl += '?'+getParams.join('&');
            
            } else {

                let paramsData = new FormData();

                if(method.toLowerCase() !== 'post'){
                    paramsData.append('_method',method.toLowerCase());
                }
                

                Object.keys(params).map(field => {

                    paramsData.append(field,params[field]);
                    return true;

                });   
                
                //payLoad['body'] = JSON.stringify(params);
                payLoad['body'] = paramsData;
            }

        }

        return fetch( ApiUrl, payLoad);
    }

    __fetch(method,url,params = {})
    {

        let payLoad = {
            method: method.toUpperCase() === 'GET' ? 'GET' : 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
            }
        };

        let ApiUrl = this.baseUrl + url;

        if(Object.keys(params).length > 0){

            if(method.toLowerCase() === 'get'){
                
                let getParams = [];

                Object.keys(params).map(field => {
        
                    getParams.push(field+'='+params[field]);
                    return true;

                });

                ApiUrl += '?'+getParams.join('&');

            } else {
                let paramsData = new FormData();

                if(method.toLowerCase() !== 'post'){
                    paramsData.append('_method',method.toLowerCase());
                }
                

                Object.keys(params).map(field => {

                    paramsData.append(field,params[field]);
                    return true;

                });   
                
                //payLoad['body'] = JSON.stringify(params);
                payLoad['body'] = paramsData;
            }
        
        }

        return fetch( ApiUrl, payLoad);
    }


    __handleError(response)
    {

        HelperLocalStorage.handle(response);
    }

    __notification(data)
    {

        let message,title,fadOutTime,cutomfn;

        message = data.message ? data.message : '';
        title = data.title ? data.title : '';
        fadOutTime = data.fadOutTime ? data.fadOutTime : 2000;
        cutomfn = data.cutomfn ? data.cutomfn : undefined;

        switch (data.type) {
            case 'info':
              NotificationManager.info(message,title,fadOutTime,cutomfn);
              break;
            case 'success':
              NotificationManager.success(message,title,fadOutTime,cutomfn);
              break;
            case 'warning':
              NotificationManager.warning(message,title,fadOutTime,cutomfn);
              break;
            case 'error':
              NotificationManager.error(message,title,fadOutTime,cutomfn);
              break;
            default:
              break;
          }
        
    }

}