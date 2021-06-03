import axios from 'axios';

const baseUrl = 'http://localhost:3002/api/login';

const login = async(userName,passWord)=>{
    //const {userName,passWord} = credentials
    console.log(`username is ${userName} password is ${passWord}`)
    const response = await axios.post(baseUrl,{userName,passWord})
    console.log(`axios response is`, response)
    return(response.data)
}

export default login