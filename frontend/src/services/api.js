import axios from "axios";

export default axios.create({               
    baseURL : 'http://localhost:3011/babydiary',      
    headers : {                         
        'Content-Type' : 'application/json'
    }                                       
});    