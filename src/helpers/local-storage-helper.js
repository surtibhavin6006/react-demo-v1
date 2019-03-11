import { clientBaseUrl } from "../constants/base";


export default class HelperLocalStorage {

    static setLoginInfo(data) 
    {
        localStorage.setItem('user-info', JSON.stringify(data));
    }

    static getLoginInfo() 
    {

        if (localStorage.getItem('user-info') !== null) {
            let gData = localStorage.getItem('user-info');
            return JSON.parse(gData);
        }

        return false;
        
    }

    static deleteLoginInfo() 
    {
        localStorage.removeItem('user-info');
    }

    static handle(response) 
    {
        if(response.status === '401' || response.status === 401){

            localStorage.removeItem('user-info');

            window.location.href = clientBaseUrl + 'login';
        }
    }
}