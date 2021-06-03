import React from 'react';
import PropType from 'prop-types';

const LoginForm = ({
userName,passWord,
loginSubmitHandler,
handleChangeUserName,
handleChangePassWord
})=>{
    return(
        <div>
        <h2>Login</h2>
        <form onSubmit = {loginSubmitHandler} >
          <div>
            UserName
            <input placeholder = 'username' value = {userName} onChange = {handleChangeUserName}
            type = 'text'></input>
          </div>
          <div>
            Password
            <input placeholder = 'password' value = {passWord} onChange ={handleChangePassWord}
            type = 'password'></input>
          </div>
          <button type = 'submit'>Login</button>
        </form>
        </div>
      )
}

LoginForm.propType = {
    userName: PropType.string.isRequired,
    passWord: PropType.string.isRequired,
    handleChangePassWord: PropType.func.isRequired,
    handleChangeUserName: PropType.func.isRequired,
    loginSubmitHandler: PropType.func.isRequired,
}

export default LoginForm