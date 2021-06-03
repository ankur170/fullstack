
import React, { useEffect, useState,useRef } from 'react';
import Notes from './Components/Notes';
import notesServices from './services/notes';
import loginServices from './services/login';
import LoginForm from './Components/LoginFormComponent';
import Togglable from './Components/Togglable';
import NoteForm from './Components/NoteFormComponent';
//console.log('loginservice is',loginServices)

const ErrorComponent = (props)=>{
  const {errMessage} = props;
  if(errMessage!==null){
    return(
      <div className = 'error'>
        {errMessage}
      </div>
    )
  }
  else{
    return(null)
  }
}

const App = ()=> {
  const [state,setState] = useState([]);
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('this is error');
  const [notesShowAll, setnotesShowAll] = useState(true)
  //const [loginFormVisible, setLoginFormVisible] = useState(false)
  //console.log('app start running')

  useEffect(()=>{
     console.log('useeffect start running')
     notesServices.getAll().then(
     (response)=>{
       console.log('response have got from server')
       console.log(response.data)
       setState(response.data)
     })
  },[])

  useEffect(()=>{
    const currentUser = window.localStorage.getItem('loggingInNoteUser')
    if(currentUser){
      const User = JSON.parse(currentUser)
      setUser(User)
      notesServices.setToken(User.token)
    }
  },[])

  const noteFormRef = useRef()

 

  //console.log(`total notes is ${state.length}`)

  const noteToShow = notesShowAll ? state : state.filter((note)=> note.important === true);
  const toggleImportant = (id)=>{
    const note = state.find((note)=> note.id === id )
    const changedState = {...note, important : !note.important}

    notesServices.update(changedState,id)
    .then((response)=>{
      setState(state.map((note)=> note.id !==id ? note : response.data))
    })
    .catch((error)=>{
      setErrorMessage(`the note ${note.content} is deleted from the server`)
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
      setState(state.find((remainNotes)=> remainNotes.id !== id))
    }
    
    )
  }

  const loginSubmitHandler = async(eve)=>{
    eve.preventDefault()
    try{
      //const p = {userName:user_Name,passWord:pass_Word}
      //console.log('value of p is ', p)
      //console.log(`typeof username is ${typeof(user_Name)} and type of password is ${typeof(pass_Word)}`)
      //console.log(`username is ${userName} password is ${passWord}`)
      const loggingInUser = await loginServices(userName,passWord)
      window.localStorage.setItem('loggingInNoteUser', JSON.stringify(loggingInUser))
      console.log(`logginginuser is`, loggingInUser)
      notesServices.setToken(loggingInUser.token)
      setUser(loggingInUser)
      setUserName('')
      setPassWord('')

    }catch{
      setErrorMessage('wrong credentials')
      setTimeout(()=> setErrorMessage(null) , 5000)
    }

  }

  const formSubmitHandler = (newObject)=>{
    noteFormRef.current.toggleVisibility()
    notesServices.create(newObject).then((response)=>{
      console.log(`notesservices create response data is`,response)
      setState(state.concat(response));
    })
  }

  const loginForm = ()=>{
    
    return(
      <div>
        <Togglable buttonLabel = 'login'>
          <LoginForm 
            userName={userName}
            passWord={passWord}
            loginSubmitHandler={loginSubmitHandler}
            handleChangeUserName = {(eve)=> setUserName(eve.target.value) }
            handleChangePassWord = {(eve)=> setPassWord(eve.target.value) }
            />
          </Togglable>
      </div>
    )
  }

  const addNewNoteForm = ()=>{
    return(
      <div>
      <Togglable buttonLabel = 'new-note' ref = {noteFormRef}>
        <NoteForm 
          create= {formSubmitHandler}
        />
        </Togglable>
    </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <ErrorComponent message={errorMessage}/>
      {user === null?
        loginForm():
       <div>
        <p>{user.name} logged-in</p>
        {addNewNoteForm()}
      </div>}
    <div >
      <button onClick = {()=>(setnotesShowAll(!notesShowAll))}>
        Show{ notesShowAll ? ' important' : ' all '}
      </button>
      <ul>
        {noteToShow.map((note)=>{
          //console.log(`note is`,note)
          return(<Notes key={note.id} note= {note} toggleImportant={
            ()=> toggleImportant(note.id)
          }/>)
        }) }
      </ul>
    </div>
    </div>
  );
}

export default App;
