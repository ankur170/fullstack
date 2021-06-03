import axios from 'axios';
const baseUrl = 'http://localhost:3002/api/notes' ;
let token = null;

const setToken = (encodedToken)=>{
    token = `bearer ${encodedToken}`
    console.log(`token is set and value is `,token)
}

const getAll = ()=>{
    console.log ('req gyi hai')
    return(axios.get(baseUrl))
}

const create = async(newObject)=>{
    const configHeader = {
        headers: {Authorization : token}
    }
    const response =await axios.post(baseUrl,newObject,configHeader)
    console.log(`check response from create newobject  is`,response.data)
    return(response.data)
}

const update = (newObject,id)=>{
    return(axios.put(`${baseUrl}/${id}`,newObject))
}

const services = {getAll,create,update,setToken}
export default  services