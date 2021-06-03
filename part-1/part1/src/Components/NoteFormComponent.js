import React, { useState } from 'react';

const NoteForm = ({
    create
})=>{
    const [newNote, setNewNote] = useState('');

    const addNewNoteHandler =(newnote)=>{
        //console.log('new note is' ,newnote.target.value)
        setNewNote(newnote.target.value)
    }

    const newNoteFormSubmitHandler = (evt)=>{
        evt.preventDefault()
        create( {
            content : newNote,
            date : new Date().toISOString(),
            important : Math.random()< .5
          })
        setNewNote('')
      }

    return(
        <>
        <h2>add a new note</h2>
        <form onSubmit = {newNoteFormSubmitHandler}>
          <input id='addnote' name='addnote' placeholder='addNote' value={newNote} onChange= {addNewNoteHandler} />
          <button type='submit'>Submit</button>
        </form>
        </>
    )
}

export default NoteForm